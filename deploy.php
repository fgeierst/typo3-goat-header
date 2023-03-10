<?php

namespace Deployer;

use Deployer\Exception\Exception;

require 'recipe/common.php';

const RSYNC_MODE = 'rsync_mode';
const TAR_MODE = 'tar_mode';

set('ssh_type', 'native');
set('ssh_multiplexing', true);
set('allow_anonymous_stats', false);
set('cleanup_use_sudo', false);

/**
 * DocumentRoot for the TYPO3 installation
 */
set('typo3_webroot', 'public');
set('typo3_console_path', './vendor/bin/typo3cms');

/**
 * Shared directories
 */
set('shared_dirs', [
    '{{typo3_webroot}}/fileadmin',
    '{{typo3_webroot}}/uploads',
]);

/**
 * Exclude from rsync
 *
 * Listed files or directories will not be uploaded to target server.
 */
set('exclude_from_build', [
    '.git*',
    '.ddev',
    'deploy.php',
    'README.md',
    'bitbucket-pipelines.yml',
    'phpsu-config.php',
    'var',
    'public/typo3temp',
    '.phpsu',
    '.env',
    'phpstan-baseline.neon',
    'phpstan.neon',
    'grumphp.yml',
    'git-hooks',
    '.editorconfig',
    'stylelint.config.js'
]);

/**
 * Writeable directories
 */
set('writable_dirs', [
    '{{typo3_webroot}}/fileadmin',
    '{{typo3_webroot}}/typo3temp',
    '{{typo3_webroot}}/uploads'
]);

/**
 * Download directories
 */
set('download_dirs', [
    '{{typo3_webroot}}/fileadmin',
    '{{typo3_webroot}}/uploads'
]);

/**
 * Shared files
 */
set('shared_files', [
    '.env',
    '.htpasswd'
]);

/**
 * Host configuration
 */
host(getenv('SSH_HOSTNAME') ?: 'example.com')
    ->user(getenv('SSH_USER') ?: 'change-me')
    ->port(getenv('SSH_PORT') ?: '22')
    ->addSshOption('StrictHostKeyChecking', 'no')
    ->multiplexing('true')
    ->set('keep_releases', getenv('KEEP_RELEASES') ?: '5')
    ->set('deploy_path', getenv('DEPLOY_PATH') ?: '/tmp')
    ->set('http_user', getenv('HTTP_USER') ?: '33')
    ->set('http_group', getenv('HTTP_GROUP') ?: '33')
    ->set('writable_use_sudo', getenv('WRITABLE_USE_SUDO') ?: 'false')
    ->set('writable_mode', getenv('WRITABLE_MODE') ?: 'chown')
    ->set('php_cli', getenv('PHP_CLI') ?: 'php')
    ->set('file_permission', getenv('FILE_PERMISSION') ?: '664')
    ->set('directory_permission', getenv('DIRECTORY_PERMISSION') ?: '775')
    ->set('base_url', getenv('BASE_URL') ?: '')
    ->set('fpm_socket', getenv('FPM_SOCKET'))
    ->set('typo3_context', getenv('TYPO3_CONTEXT') ?? 'Development');

/**
 * Task pluswerk:upload
 *
 * This task moves the built application to the target server.
 */
task('pluswerk:upload', function () {
    $rsyncOptions = generateExcludeOptions(RSYNC_MODE);
    upload(__DIR__ . '/', '{{release_path}}/', ['options' => $rsyncOptions]);
})->desc('Upload release to release_path');

/**
 * Task pluswerk:finalize
 *
 * This task contains every command, which is needed after successful deployment.
 */
task('pluswerk:finalize', function () {
    cd('{{release_path}}');
    run('TYPO3_CONTEXT={{typo3_context}} {{php_cli}} {{typo3_console_path}} database:updateschema safe');
    run('TYPO3_CONTEXT={{typo3_context}} {{php_cli}} {{typo3_console_path}} install:fixfolderstructure');
    run('TYPO3_CONTEXT={{typo3_context}} {{php_cli}} {{typo3_console_path}} install:extensionsetupifpossible');
    run('TYPO3_CONTEXT={{typo3_context}} {{php_cli}} {{typo3_console_path}} cache:flush');
    run('curl -L {{base_url}}clear_opcache.php');
    run('rm -f public/clear_opcache.php');
})->desc('finalize');

/**
 * Task pluswerk:deploy
 *
 * This is the main task, which is executed with deployer cli script for deployment.
 */
task('pluswerk:deploy', [
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'pluswerk:upload',
    'deploy:shared',
    'deploy:symlink',
    'pluswerk:finalize',
    'deploy:unlock',
    'cleanup',
    'success',
])->desc('Build and deploy project to destination');

/**
 * Unlock deployment after failure. This is important to enable a repeating deployment.
 */
fail('pluswerk:deploy', 'deploy:unlock');

/**
 * generateExcludeOptions()
 *
 * Helper to generate exclude parameter for rsync and tar
 */
function generateExcludeOptions($mode, $implode = false)
{
    $excludeFromBuild = get('exclude_from_build');
    $excludeOptions = [];
    // prepare exclude options
    foreach ($excludeFromBuild as $item) {
        if ($mode === TAR_MODE) {
            $excludeOptions[] = '--exclude=\'./' . $item . '\'';
        } elseif ($mode === RSYNC_MODE) {
            $excludeOptions[] = '--exclude=\'' . $item . '\'';
        }
    }

    if ($implode) {
        $excludeOptions = implode(" ", $excludeOptions);
    }

    return $excludeOptions;
}

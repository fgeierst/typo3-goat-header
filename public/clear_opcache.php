<?php

$cacheCleared = opcache_reset();
if ($cacheCleared === true) {
    echo "success";
}

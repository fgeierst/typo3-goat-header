# PWMUC TYPO3 Lab

- **Goat Header**. Reference implementation of a generic header and navigation component. Work in progress.
  - https://xd.adobe.com/view/2f29c044-d202-4082-8190-2990ef9260a5-7a7a/
  - https://codepen.io/fgeierst/pen/poOWVeO
  - https://codepen.io/bahr-lukas/pen/LYJzNYL


## Prerequisites

- [Docker Desktop or Colima](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/)
- [DDEV](https://ddev.readthedocs.io/en/latest/)
- [Mutagen](https://ddev.readthedocs.io/en/latest/users/install/performance/#mutagen) needs to be enabled for HMR


## Local installation guide

	git clone git@bitbucket.org:pluswerk/pwmuc-typo3-lab.git
	cd pwmuc-typo3-lab
	ddev start
	ddev exec cp .env.example .env
	ddev composer install
	ddev snapshot restore --latest

Login using these credentials:

- Username: `admin`
- Password: `oZim4R7eLEWzzL`

## Installing needed tools for FE developemnt

Installing all the needed prerequisites for FE development

	ddev npm i
    ddev pnpm install
## Vite development server

The development server is already running in the background (started by `ddev start`). You can control it with

	ddev vite-serve start|stop

Running `ddev pnpm dev` does the same, but shows Vite's output in the terminal - which is helpful for debugging.


## Test the production build

	ddev pnpm build

Switch applicationContext to production in _.env_ (or in .ddev/config.yaml under web_environment)

	# TYPO3_CONTEXT="Development/Local"
	TYPO3_CONTEXT="Production/Staging"

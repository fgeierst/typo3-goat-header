# TYPO3 Goat Header

This project shows a generic header navigation for TYPO3.


## Based on

- https://codepen.io/fgeierst/pen/poOWVeO
- https://codepen.io/fgeierst/pen/xxaXjqK


## Prerequisites

- [Docker Desktop or Colima](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/)
- [DDEV](https://ddev.readthedocs.io/en/latest/)
- [Mutagen](https://ddev.readthedocs.io/en/latest/users/install/performance/#mutagen) needs to be enabled for HMR


## Local installation guide

	git clone https://github.com/fgeierst/typo3-goat-header.git
	cd typo3-goat-header
	ddev start
	ddev exec cp .env.example .env
	ddev composer install
	ddev snapshot restore --latest

Login via https://typo3-goat-header.ddev.site/typo3 using these credentials:

- Username: `admin`
- Password: `oZim4R7eLEWzzL`


## Vite development server

The development server is already running in the background (started by `ddev start`). You can control it with

	ddev vite-serve start|stop

Running `ddev pnpm dev` does the same, but shows Vite's output in the terminal - which is helpful for debugging.


## Test the production build

	ddev pnpm build

Switch applicationContext to production in _.env_ (or in .ddev/config.yaml under web_environment)

	# TYPO3_CONTEXT="Development/Local"
	TYPO3_CONTEXT="Production/Staging"

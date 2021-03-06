# NotifyMe Web Apps

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/notifyme-app/notifyme-sdk-backend/blob/master/LICENSE)

## Introduction
NotifyMe is a decentralised check-in system for meetings and events. Users can check in to a venue by scanning a QR Code. The check in is stored locally and encrypted. In case one of the visitors tests positive subsequent to a gathering, all other participants can be easily informed via the app. The implementation is based on the [CrowdNotifier White Paper](https://github.com/CrowdNotifier/documents) by Wouter Lueks (EPFL) et al. The app design, UX and implementation was done by [Ubique](https://ubique.ch/). More information can be found [here](https://notify-me.ch).

This web app serves content to devices that don't have the [NotifyMe App](https://notify-me.ch) installed, displaying the decoded QR entry code data, as well as information on where to install the app.

## Repositories
* Android SDK: [crowdnotifier-sdk-android](https://github.com/CrowdNotifier/crowdnotifier-sdk-android)
* iOS SDK: [crowdnotifier-sdk-ios](https://github.com/CrowdNotifier/crowdnotifier-sdk-ios)
* TypeScript Reference Implementation: [crowdnotifier-ts](https://github.com/CrowdNotifier/crowdnotifier-ts)
* Android Demo App: [notifyme-app-android](https://github.com/notifyme-app/notifyme-app-android)
* iOS Demo App: [notifyme-app-ios](https://github.com/notifyme-app/notifyme-app-ios)
* Backend SDK: [notifyme-sdk-backend](https://github.com/notifyme-app/notifyme-sdk-backend)
* Web Apps: [notifyme-webpages](https://github.com/notifyme-app/notifyme-webpages)

## Work in Progress
The NotifyMe SDK Backend contains alpha-quality code only and is not yet complete. It has not yet been reviewed or audited for security and compatibility. We are both continuing the development and have started a security review. This project is truly open-source and we welcome any feedback on the code regarding both the implementation and security aspects.

## Further Documentation
The full set of documents for CrowdNotifier is at https://github.com/CrowdNotifier/documents. Please refer to the technical documents and whitepapers for a description of the implementation.

## Build

-   This project requires Hugo 0.78.2 which can be installed from [here](https://gohugo.io/getting-started/installing). **Careful** the extended version is needed for SCSS preprocessing.
-   Download `yarn` and run `yarn install` to install all dependencies.
-   Run `yarn build:prod:js` to precompile javascript files. Run `yarn build:dev:js` to include a source map and not minify the javascript.
-   Run `yarn watch:js` to precompile javascript files and watch for changes.

### Build Site

You can build three different Webpages from this code. They are defined in their respective config files:

-   QR-Generator `config_qrgenerator.toml`
-   QR Upload Page `config_uploadpage.toml`
-   Landing Page `config_landingpage.toml`

The sites can be built with the command `hugo --config config.toml,${site_config}`. For this to work, you need to first precompile the javascript files. The build files are placed in the `public/` folder.

### Start Server

Simlarly a dev server can be started with `hugo --config config.toml,config_dev.toml,${site_config} server`

### Getting the translations

This project contains translations for German, English and French which are kept in the `i18n` subdirectory. These are only periodically updated.

If you have your own translations on POEditor, you can simply run `getTranslations.py` with Python 3. You will need to create a `secrets.py` file in your root folder which looks like this:

    api_token = 'YOUR_POEDITOR_API_KEY'
    project_id = 'YOUR_POEDITOR_PROJECT_ID'

## License
This project is licensed under the terms of the MPL 2 license. See the [LICENSE](LICENSE) file.

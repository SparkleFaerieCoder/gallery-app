<p align="center">
  An opinionated <a href="https://docs.expo.dev">Expo</a> Bare Workflow template that will allow you to start a new React Native project quickly with TypeScript, Prettier, ESLint, and some custom configurations that will make development process better. 💖
</p>

<h1 align="center">Echobind Expo Bare Workflow TypeScript Template</h1>
<br>

## Quick start

1. Install [Expo CLI](https://docs.expo.dev/get-started/installation/) with `npm install --global expo-cli` or `yarn global add expo-cli`.
2. Create new React Native project with `expo init --template @echobind/expo-typescript`.
3. Change directory to your project's folder with `cd <your-project-name>`.
4. Run Metro Bundler with `yarn start`.
5. Build and run the project with `yarn ios` or `yarn android`.

Happy hacking! 🤓

## Setting up a Development Client

This template is set up to use [Expo Development Builds](https://docs.expo.dev/development/introduction/), which let you test your app on an iOS or Android device without having to install Xcode or Android Studio.

If your app is simple and you want to use [Expo Go](https://expo.dev/client), just remove the `--dev-client` from the "start" script in package.json.

If you are planning on adding some custom modules to your app, you'll need to create a custom development client and install it on your device. There are a few steps you'll need to do first.

- Add a URI Scheme to your app by running `npx uri-scheme add customscheme`
- Follow [these instructions](https://docs.expo.dev/development/getting-started/) to set up and create the development build with EAS Build. 
  - Sign up for an Expo account
  - Install the Expo and EAS CLIs
  - Sign in to the EAS CLI
  - Register your device
  - Build the development build

> Note that you will need an Apple Developer account and an Expo account to use EAS Build. You do _not_ however need to pay the $100 development fee.

- Install the built app on your test device.
- Start the app (make sure you are using the `expo start --dev-client` command)
- Scan the resulting QR code with your camera to open your app connected 

> If the QR code doesn't work, you can manually connect to the bundler by shaking the phone, choosing "Configure Bundler" and entering your computer's IP address.

## TODOs

- Contexts (any reusable ones)
- Common reusable UI components
- Expo splashscreen
- Hopefully some e2e testing

## Available commands

- `yarn start` - start Metro Bundler.
- `yarn ios` - build and run iOS.
- `yarn android` - build and run Android.
- `yarn lint`, `lint:fix` - check code for errors.
- `yarn g:<generator name>` - generate some code (see [package.json](./package.json) for specific scripts).

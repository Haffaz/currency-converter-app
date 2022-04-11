Currency Converter
==================

* A simple currency converter application that allows users to search for countries and enter an amount in SEK 
(Swedish Krona) to be converted in to the local currencies of the selected countries.


## Base Dependencies
* `@react-navigation` for navigations
* `react-query` for data-fetching

## Usage

### `npm run ios`
* Build the iOS App (requires a MacOS computer).

### `npm run android` 
* Build the Android App.

### `npm run lint`
* Run lint on project src directory.

## Top-level directory layout

    .
    ├── src                 # Source directory
    │   ├── api             # Api query/mutation hooks and related type files
    │   ├── components      # Custom components
    │   ├── navigation      # Navigators 
    │   ├── pages           # Page components
    │   ├── styles          # Style guides
    │   └── util            # Tools and Util functions
    ├── assets              # Assets directory
    └── README.md

# Useful resources & Further reading
 * [Expo docs](https://docs.expo.dev/)
 * [React Navigation](https://reactnavigation.org/docs/getting-started/)
 * [React Query](https://react-query.tanstack.com/overview)

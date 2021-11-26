# Dev Env

```
yarn global add expo-cli
expo init AwesomeProject
```

- yarn >> npm, due to workspaces and better/faster dependency management as seen on linux

## App design

http://www.omdbapi.com/?i=tt3896198&apikey=968f91f7

## React Native

- Since React's Hooks API in 2017, functional components >> class components
- Native components vs Core components (`View`, `Text`)
- Synthetic events are named differently `onChangeText`
- How to handle heterogeneous Scroll? `ScrollView`
- React Native provides the **Fetch API** for your networking needs.
- Routing === Navigation via Stack data structure
  - pass paramters to routes

## RN Components

- StatusBar - show/hide status as a part of app

## Issues

safe area module not found

```
yarn add react-native-safe-area-view react-native-safe-area-context
```

Android Bundling failed react-native-screens not found ?

https://reactnavigation.org/docs/getting-started/

```
yarn add react-navigation
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn add react-navigation-stack @react-native-community/masked-view
```

VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.

work on responsiveness

## ToDOs

- [ ] write tests, to make it more reliable
- [ ]

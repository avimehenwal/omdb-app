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

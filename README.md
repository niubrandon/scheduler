# Interview Scheduler
A web application that allows users to book and cancel interviews. It combines a concise API with a WebSocket server to build a realtime experience

## Project features
- users can book, modify and delete appointment
- used design patterns controlled components, React Hooks (useState, useEffectm useReducer and custom hooks)
- Test Driven Development with isolation components development, unit testing, integration testing and end to end testing
- Hosted server on Heroku
- Integrated continuous pipeline with CircleCI and Netlify 
## UI
![mainpage](https://github.com/niubrandon/scheduler/blob/master/public/images/bookappointment.png?raw=true)
## Cypress integration and end to end automated testing
![demo](https://github.com/niubrandon/scheduler/blob/master/public/images/schedulervideo.gif?raw=true)


## Dependencies
- axios
- classnames
- storybook
- react-test-renderer
- @testing-library/react-hooks
- @testing-library/jest-dom
- @testing-library/react
- cypress
- node-sass

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running cypress end to end automated testing

```sh
npm run cypress
```
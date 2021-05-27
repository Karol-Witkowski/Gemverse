# Gemverse

[![Gemverse](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/g42uwf&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/g42uwf/runs)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b579256de9794b9dadf521dded359088)](https://www.codacy.com/gh/Karol-Witkowski/Gemverse/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Karol-Witkowski/Gemverse&amp;utm_campaign=Badge_Grade)

<p align="center"><code><img alt="Gemverse logo" height="90" title="Gemverse logo" src="client\src\assets\img\logo.png"></code></p>

<b>Gemverse</b> is a real-time chat built using the MEVN stack. The app is based on rooms - organized channels that allow user to talk about programming, hobbies, games and more.

## Contents

- [Demo](#demo)
- [Technologies](#Technologies)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#Running-Locally)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
<hr>
<br>

## Demo

UNDER DEVELOPMENT
<hr>
<br>


## Technologies

| Technology | Description | Link |
|-|-|-|
| Sass | Preprocessor that helps write maintainable CSS | https://sass-lang.com |
| Vuetify | Vue UI Library helps to generate responsive and polished applications | https://vuetifyjs.com |
| Vue.js | Versatile Progressive Javascript Framework for building user interfaces | https://vuejs.org |
| Node.js | Asynchronous JavaScript runtime designed to build scalable network applications | https://nodejs.org |
| Express | Unopinionated, minimal and flexible Node.js framework | https://expressjs.com |
| Socket.IO | Web sockets implementation enables real-time event-based communication | https://socket.io |
| Passport | Authentication middleware for Node.js | https://www.passportjs.org |
| JWT | A package that generates tokens for secure authentication | https://github.com/auth0/node-jsonwebtoken |
| bcrypt.js | A library to help hash passwords stored in databases | https://github.com/dcodeIO/bcrypt.js |
| MongoDB | NoSQL document database that works well with Node.js | https://www.mongodb.com |
| Mongoose | MongoDB object modeling tool for Node.js | https://mongoosejs.com |
| Day.js | A library that parses, validates, manipulates, and displays dates and times | https://github.com/iamkun/dayjs |
| Jest | A comprehensive JavaScript testing solution | https://jestjs.io |
| Cypress | e2e Testing Framework that runs in a browser | https://www.cypress.io |
<hr>
<br>

## Features

- Register and authenticate users, secure passwords

- Enable room based communication

- Create public/secured room or join already made channels

- Display new users and rooms in real-time

- Generate unique SVG based avatars

- Allow users to delete their own accounts and generate anonymous alias
<hr>
<br>

## Installation
### Prerequisites

>To run the application install Node.js and MongoDB. To do so follow instructions on official websites. Installing Vue-CLI is optional but recommended

- [NodeJS](https://nodejs.org) (version 14 or above)
- [MongoDB](https://www.mongodb.com)
- [Vue-CLI](https://cli.vuejs.org)

<br>

### Running Locally

1. Clone the repository
```bash
git clone git@github.com:Karol-Witkowski/Gemverse.git
cd Gemverse
```

2. Install dependencies

Run npm install for root, client and server directories to install required node modules.

- Install dependencies for the project root folder
```bash
npm install
```

- Install dependencies for the client directory
```bash
cd client
npm install
```

- Install dependencies for the server directory
```bash
cd server
npm install
```

3. Create a .env file in the server directory according to the configuration

Go to [configuration section](#configuration) or check a .env.example file inside the repository.

4. Set properly environment variables

_To run code locally variables must be set exactly like in the example:_
```bash
NODE_ENV='development'
HEROKU_DEPLOYMENT=false
```

5. Run the application
>Be sure to run a script in the project root folder, or use a [npm scripts](#available-scripts)

```bash
npm run dev
```

Visit application on: [localhost:8080](http://localhost:8080/).

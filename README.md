
<h1 align="center">
  <br>
  <a href="http://remeapp.netlify.app"><img src="https://user-images.githubusercontent.com/70352144/191369786-648bd405-70c2-47ca-bc43-529ae7bb7b62.png" alt="ReMe" width="200"></a>
  <br>
  RemindMe - ReMe
  <br>
</h1>

<h4 align="center">A simple reminder application for personal or group use. This frontend application is written in <a href="https://reactjs.org/">React.js</a> and deployed automatically on merges to master via Netlify. The backend made in Node.js (<a href="https://expressjs.com/">Express.js</a>) can be access at this <a href="https://github.com/tienviet10/todos-server">link.</a></h4>

<p align="center">
  <a href="#key-features">Tech Stack & Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#building">Building</a> •
  <a href="#usage">Usage</a> •
  <a href="#todo">TODO</a>
</p>

<div align="center">
  <a href=""><img src="https://user-images.githubusercontent.com/70352144/191378535-68036f59-8a9a-4d27-b4a0-165614571996.gif" alt="Application" ></a>
</div>

## Tech Stack & Features

* React.js
* [Tailwind](https://tailwindcss.com/) for design/styling and [HeadlessUI](https://headlessui.com) for some custom components
* [React Router](https://reactrouter.com/) for routing
* Managing data requests using [React Query](https://react-query-v3.tanstack.com)
* [React Icons](https://react-icons.github.io/react-icons/) for icons
* [Datetime Picker](https://github.com/wojtekmaj/react-datetime-picker#readme) for choosing date and time for reminders
* Google Calendar intergration using OAuth 2.0 protocol

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

1. Create a folder and clone this repository

```sh
$ git clone https://github.com/tienviet10/todos-client.git
```

2. Move to the correct directory

```sh
$ cd todos-client
```

3. Install dependencies

```sh
$ npm install
```
4. Fill out all variables in .env file. Follow the Google Calendar Integration instructions below to obtain the necessary keys.

5. Run the application

```sh
$ npm start
```

**Google Calendar Integration**

1. Sign up and log into [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project
3. Create Credentials for Google Calendar API. Copy the API key and paste to the REACT_APP_API_KEY in .env file. 
4. Create Credentials for OAuth 2.0 Client IDs if you have not generated one. Copy the Client ID to REACT_APP_CLIENT_ID variable in .env file.

## Building

Run 'npm run build' and use the newly created 'build' folder for deployment.

## Usage

**Reminder**: Reminder tab let you add, view, or change the details of your personal reminder. You can link the personal reminders to your Google Calendar by signing in your google account in Profile. 

**Favorite**: All the favorite reminders will be displayed at the top of the page. 

**Shared Reminder**: Share tab let you create, view, or change a shared reminder with a group of users. Users must be added to your friend list before adding to the shared reminder.

**Seven Days Summary**: In notification, seven days summary displays the summary of today reminders as well as this week reminders.


## TODO

* Choose what personal reminders can be added to your Google Calendar
* Internationalize all text
* Increase performance on load

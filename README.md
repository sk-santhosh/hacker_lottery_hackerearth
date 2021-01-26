# Hacker Lottery 
## Firecompass Senior Fullstack Engineer Hiring Challenge

[Full Stack Developer Challenge](https://assessment.hackerearth.com/challenges/hiring/firecompass-lead-software-engineer-hiring-challenge/)

### Packages used: 
1. ReactJS
2. NodeJS
3. MySQL
4. knex
5. ExpressJS
6. semantic-ui-react
7. Concurrently
8. axios

![screenshot](https://github.com/sk-santhosh/hacker_lottery_hackerearth/blob/master/screenshoot.png?raw=true)


## Install
```bash
npm install
```

## Configuer DB

Modify the connection string in `server/.env` file, and update server url in `client/src/config/Config.js`

## Migrating MySQL Table
```bash
cd server/db && knex migrate:latest
```

## Start Application
```bash
npm start
```

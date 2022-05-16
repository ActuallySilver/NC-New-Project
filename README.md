# NC NEWS

You can find the hosted API here: https://jasonw-nc-news.herokuapp.com/api

## About
This is an application that hosts an API which allows you to access users, articles, comments and topics from the NC news database.

## Running locally
1. Clone the repository using `git clone https://github.com/ActuallySilver/NC-News-Project.git`
2. Install required dependencies using `npm i`
3. Create two files, `.env.development` and `.env.test` and add text `PGDATABASE=nc_news`, `PGDATABASE=nc_news_test` respectively
4. run the command `npm run setup-dbs` to setup the database
5. run the command `npm run seed` to seed the database
6. Check everything is working correctly with `npm test`

#### Minimum node version required: 
`node v16.13.2`
#### Minimum PostgreSQL version required: 
`12.9`

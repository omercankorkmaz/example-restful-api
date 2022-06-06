# Example Restful API

- Used Node.js with Express.js framework<br />
- Mocha and Chai for testing<br />
- Mongodb for database.

# DB Connection

Created an .env file in root directory of project for db credentials, content of it:

  MONGODB_HOST = ******<br />
  MONGODB_USERNAME = ******<br />
  MONGODB_PASSWORD = ******<br />
  MONGODB_PORT = ******<br />
  MONGODB_DBNAME = ******<br />

# Assumptions

* in country endpoint i'm not allowed to create a method with query that groups records by regions & gets counts of them (to use in sales-rep & optimal endpoints, so i did the needed data manipulations in javascript)

* because of the request of using 'region' as query parameter, i restricted countries find method with 'region' (can not query with 'name' attribute)

# Setup
```
git clone https://github.com/omercankorkmaz/example-restful-api.git
cd example-restful-api
 ```
# Start
```
npm run start
 ```
 or start with nodemon
 ```
npm run start-nodemon
 ```
 app running on http://localhost:3000
 # Test
```
npm run test
 ```

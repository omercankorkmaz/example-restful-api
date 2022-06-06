# example-restful-api

Used node.js with express.js framework &amp; mongodb for database.

Used .env for db credentials, content of it:

  MONGODB_HOST = 
  MONGODB_USERNAME = 
  MONGODB_PASSWORD = 
  MONGODB_PORT = 
  MONGODB_DBNAME =

# Assumptions
* in country endpoint i'm not allowed to create a method with query that groups records by regions & gets counts of them (to use in sales-rep & optimal endpoints, so i did the needed data manipulations in javascript)

* because of the request of using 'region' as query parameter, i restricted countries find method with 'region' (can not query with 'name' attribute)

# Setup

git clone https://github.com/omercankorkmaz/example-restful-api.git
cd example-restful-api
 

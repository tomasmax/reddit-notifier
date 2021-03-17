# Reddit Notifier

[Demo](https://reddit-newsletter-notifier.herokuapp.com/api/v1/users/tomasmax/newsletter?contentType=html)

A nodeJS express service that handles:
 - Creating and updating users
 - Adding, and updating a user's favorite subreddits
 - Sending out an email to each user at a choosen time (default daily at 8am), containing the top posts of each of their favorite subreddits
 - Turning on and off the newsletter send out for a specific user

 **Rest API endpoints:**
 [Deployed base url](https://reddit-newsletter-notifier.herokuapp.com)

 ```
 GET   /api/v1/users/:id
  Gets user with :id

 POST  /api/v1/users/
  Creates a user with required params in body: id(string), name(string), email(string), favoriteSubreddits(Array of strings), sendNewsletter(boolean)

 PUT   /api/v1/users/
  Updates user with id

 PATCH /api/v1/users/favorite-subreddits/add
  Adds favorite subreddits to user. Body params: id, favoriteSubreddits

 PATCH /api/v1/users/favorite-subreddits/add
  Removes favorite subreddits to user. Body params: id, favoriteSubreddits

 PATCH /api/v1/set-send-newsletter
  Sets users sendNewsletter flag. Body params: id, sendNewsletter

 GET   /api/v1/users/:id/newsletter
  Gets a user reddit newsletter in json(default) or html. Query params: id, contentType=html (this one is optional to see it in html)
  
 GET   /api/v1/users/:id/send-newsletter
  Send reddit neewsletter email to the user with :id

 ```

**To run it locally:**
  - Install dependencies `npm install`
  - Set your env variables in the project root folder `.env`
    ```
    MONGO_DB_CONNECT=Your_mongo_db_connect_URI # Example: mongodb://admin:admin@localhost:27017/reddit-notifier?authSource=admin
    SENDGRID_API_KEY=Your_sendgrid_API_KEY
    ```
  - Run without watching `npm run start`
  - Run for dev (watches for any files changes) `npm run start:dev`

**To run tests**
  - After dependencies are installed
  - Run test `npm run test`
  - Run test watching for changes `npm run test:watch`



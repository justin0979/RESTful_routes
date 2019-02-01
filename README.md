This is the basic use of the 7 RESTful routes. Data is stored with MongoDB. 
The application is run with the help and convenience of docker-compose.

Get Docker and run `docker-compose up --build`. 
When done, run `docker-compose down`

--NOTE--

Originally, I had an issue with Mongo starting up after my application and consitently getting a network error.
I recently found out about 

`depends_on:`

` - mongo`


which helps in making the application wait to start until Mongo is running. I read that this will not always
work; but, for now, it's what I'll incorporate into my `docker-compose.yml` file.

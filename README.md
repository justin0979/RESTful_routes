This is the basic use of the 7 RESTful routes. Data is stored with MongoDB. 
The application is run with the help and convenience of docker-compose.

Get Docker and run `docker-compose up --build`. 
When done, run `docker-compose down`

--NOTE--

Sometimes at run time, I'll get network errors with Mongo.
I'm not sure if it is caused by Mongo starting up after the server application starts up, 
resulting in `mongo.connect()` not being able to find a running instance of Mongo.
If that is the case, then I may need to wrap the app in `setTimeout()` to allow for Mongo app to
get up and running first.

I usually just `docker-compose down` when network error occurs.
Then I just run `docker-compose up` right after.

On a more up-to-date laptop, I have to do this about 4-5 times before I get the full app up and running.
On my older Dell Inspiron 530, I usually only have to do this once every several `up`'s or 
`up --build`'s. 

I did put a SSD in the Dell, and it is awesome; so, I'm assuming all of the other old, busted, outdated 
hardware is the culprit in my application normally starting after Mongo is up and running.

I'm not a Docker expert, by far, so there could be some simple command to add to the .yml file to fix this.
I'll continue to research this issue.

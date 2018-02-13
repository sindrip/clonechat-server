# clonechat-server
### Development guide

clonechat-server is developed through [Docker](https://www.docker.com/community-edition#/download).
The only requirement is that you have [Docker](https://www.docker.com/community-edition#/download) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Starting the server

To start the server cd into the root project directory and start docker-compose
```sh
$ cd git/clonechat-server
$ docker-compose up --build
```

Nodemon is running so the server is reloaded on every file change

### Testing with Postman
You need to install [Postman](https://www.getpostman.com/)

You can then access the Postman collection [here](https://www.getpostman.com/collections/ae0ff7eb103b83bcc057)

The API is exposed on localhost:3000 on your host machine

### Migrating DB to production
Run the following command in the project directory

 ```sh
$  heroku run knex migrate:latest --knexfile="./server/knexfile.js"
```


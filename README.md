# clonechat-server
# Dev. environment setup
### Installation

clonechat-server requires [Node.js](https://nodejs.org/) to run.
It also requires a postgres database named clonechat.

To install the dependencies

```sh
$ cd git/clonechat-server
$ npm i
```
To create the database tables
```sh
$ cd git/clonechat-server/server
$ knex migrate:latest --env development
```

### Starting the server
You need to have a config.json file under /clonechat-server/server/config with the relevant keys filled in
```json
{
    "development": {
        "PORT": 3000,
        "DATABASE_NAME": "clonechat",
        "DATABAUSE_USER": "postgres",
        "DATABASE_PW": "1234"
    }
}
```

To start the server
```sh
$ cd git/clonechat-server
$ npm start
```

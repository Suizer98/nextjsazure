# Wedding Backend Nextjs app

This project was created for weddinginvitation frontend app.

Tech stacks: Netlify, Typescript Nextjs, Prisma, Render PostgreSQL

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000/docs](http://localhost:8000/docs) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install`

To install all dependencies from `package.json`

### `Storing your postgresql password and secretkey`

```
heroku config:set SQLALCHEMY_DATABASE_URL="postgresql://{user}:pw@{hostname}.{yourhostingwebsite}.com/wedding_db_lgif" -a weddingbackend
heroku config:set SECRETKEY=xxxx -a weddingbackend
```
```.env
SQLALCHEMY_DATABASE_URL=postgresql://
SECRETKEY=xxxx
USER=xx
PASSWORD=xxx
```

You can store the env variable somewhere using .env or setting this inside your heroku container so it don't get exposed
# Nextjs app for Azure use

This is a nextjs project that consist OpenLayer Map. The main goal of
this website is to showcase complete workflow of auto deploy
pipeline using:

1. Github Action pipeline

2. Docker login and push image to Azure Container Registry

3. Deploy image as web app service on Azure Web App Service

4. To form connection between Azure services (Azure SQL Server)

In future, will migrate to free database instance like Render

Tech stacks: Azure Web Service, Typescript Nextjs, OpenLayer, Prisma, Azure ACR, Azure SQL Database, Vercel

The application is hosted on: [https://nextjsazure.azurewebsites.net/](https://nextjsazure.azurewebsites.net/)

The dev site is hosted on: [https://nextjsazure.vercel.app/](https://nextjsazure.vercel.app/)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000/](http://localhost:8000/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install`

To install all dependencies from `package.json`

### `npm run format`

To fix all formatting and linting using `prettier`

### Storing your database password and secretkey

```.env
DATABASE_URL=sqlserver://
SDATABASE_URL=sqlserver:// # Shadow database for prisma migration
```

You can store the env variable somewhere using .env or setting this inside your container or pipeline variables so it don't get exposed

### Database connection

In this project we use Prisma ORM to talk with database:

```
npx prisma init
npx prisma generate
npx prisma migrate dev
```

### Running inside docker container

Must have wsl2 and Docker Desktop installed:

```
docker-compose up --build
docker exec weddingbackendnextjs-nextjsazure-1 npx prisma generate
docker exec weddingbackendnextjs-nextjsazure-1 npm run format
```

### Steps to setup Azure

1. Go to Azure Portal
2. Create a resource group
3. Create a container registry (ACR) under same resource group
4. Create a web service tied to that ACR

---

For Azure Cli:

```
az login
az account set --subscription "<Your-Subscription-Name-Or-ID>"
az ad sp create-for-rbac --name "<Your-Service-Principal-Name>" --role contributor --scopes /subscriptions/{SubscriptionId}/resourceGroups/<Your-Resource-Group-Name>
```

### Connect to Azure Web App SSH

Follow the Dockerfile configuration, then go to:
https://learn.microsoft.com/en-gb/azure/app-service/configure-custom-container?pivots=container-linux&tabs=debian#enable-ssh

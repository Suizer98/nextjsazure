# Nextjs app for Azure use

This is a nextjs project that consist OpenLayer Map. The main goal of
this website is to showcase complete workflow of auto deploy
pipeline using:

1. Github Action pipeline

2. Docker login and push to Azure Container Registry

3. Deploy image as web app on Azure Web App Service

Tech stacks: Vercel, Typescript Nextjs, OpenLayer, Prisma, Render PostgreSQL, Azure ACR

The application is hosted on: [https://nextjsazure.azurewebsites.net/](https://nextjsazure.azurewebsites.net/)

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

### `Storing your postgresql password and secretkey`

```.env
SQLALCHEMY_DATABASE_URL=postgresql://
```

You can store the env variable somewhere using .env or setting this inside your container or pipeline variables so it don't get exposed

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

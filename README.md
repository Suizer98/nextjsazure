# Nextjs app for Azure use

This is a nextjs project consisting a OpenLayer Map that show beautiful windy style layer. The main goal of
this website is to showcase complete workflow of auto deploy
pipeline using Github Actions to Microsoft Azure platform.

Two approaches were practiced:

1. **IaaS Approach using Azure Virtual Machines**:

   - Deploy the application on an Azure Ubuntu Virtual Machine.
   - Manage the entire VM, including Docker containers, ports, application dependencies.
   - Suitable for scenarios requiring deep customisation and control over the server environment.

2. **PaaS Approach using Azure Web App Service and Azure Container Apps**:
   - Deploy the application using Azure Web App Service for managed hosting.
   - Utilize Azure Container Instances to deploy the Docker image from Container Registry.
   - Simplifies deployment and management with less overhead.

## Tech stacks:

![Tech stacks](https://skillicons.dev/icons?i=ts,next,tailwind,prisma,azure,githubactions,docker,ubuntu,bash,vercel,npm,mysql)

The application is hosted on:

1. Azure Ubuntu Virtual Machine (Production, discontinued)

2. Azure Web App Service (Staging, discontinued): [https://nextjsazure.azurewebsites.net/](https://nextjsazure.azurewebsites.net/)

3. Azure Container App (Staging, discontinued): [http://suizer.bqazfuf4fmdfdjgr.southeastasia.azurecontainer.io/](http://suizer.bqazfuf4fmdfdjgr.southeastasia.azurecontainer.io/)

4. Vercel (dev site with no database connection): [https://nextjsazure.vercel.app/](https://nextjsazure.vercel.app/)

## Available Scripts

In the project directory, you can run:

### Local development

Runs the app in the development mode.

```
npm install
npm run dev
```

Open [http://localhost:8000/](http://localhost:8000/) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Found issues in code style?

To fix all formatting and linting using `prettier`:

```
npm run format
```

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
docker exec nextjsazure-nextjsazure-1 npx prisma generate
docker exec nextjsazure-nextjsazure-1 npm run format
```

### Steps to setup Azure functions

1. Go to Azure Portal
2. Create a resource group
3. Create a container registry (ACR) under same resource group
4. Create a web service/container instance tied to that ACR

---

You will also need to install Azure Cli to perform:

```
az login
az account set --subscription "<Your-Subscription-Name-Or-ID>"
az ad sp create-for-rbac --name "<Your-Service-Principal-Name>" --role contributor --scopes /subscriptions/{SubscriptionId}/resourceGroups/<Your-Resource-Group-Name>
az webapp log tail --name <app-name> --resource-group <resource-group-name> # log
```

### Connect to Azure Web App SSH

Follow the Dockerfile configuration, then go to:
https://learn.microsoft.com/en-gb/azure/app-service/configure-custom-container?pivots=container-linux&tabs=debian#enable-ssh

### Problem troubleshooting Azure web app linux host connecting to Azure SQL Server

Many people have been facing issues establishing a connection between Azure linux hosted web app and Azure SQL database server.
Some of the forum discussions: https://serverfault.com/questions/1104918/azure-app-service-to-sql-server-db-connection-fails-with-generic-error-occurred

The alternative way is to use a Azure virtual machine instead.

### How to deploy nextjsazure to Azure Ubuntu VM

If you are looking to deploy this Next.js app on an Azure Ubuntu VM, please refer to the documentation provided [here](docs/README_VM.md).

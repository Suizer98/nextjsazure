# Nextjs app for Azure VM use

This is a documentation on how to deploy app to Azure Ubuntu VM

### Creating a VM

1. HTTP (port 80) and HTTPS (port 443):

If you're hosting a web application inside a Docker container on your VM and you want it to be accessible over the internet via HTTP (port 80) and HTTPS (port 443), you'll need to open these ports as well.
Once you've configured the networking settings according to your requirements, proceed with creating the VM.

2. Regarding accessing the VM (SSH, RDP):

SSH: You can SSH into a Linux VM deployed on Azure. Azure provides a web-based SSH terminal directly in the Azure portal for easy access to Linux VMs.

RDP: Remote Desktop Protocol (RDP) can be used to connect to Windows VMs. You need to use an RDP client to connect to the VM. By default, RDP is not open to all, so you need to open port 3389 for RDP to be accessible from the internet.

Bastion: Hourly price rate which is more expensive

### Setting up VM Docker

1. Connect to your Ubuntu VM using SSH.
2. Run the following commands to install Docker:

```
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker # on startup
sudo usermod -aG docker $USER
```

3. Install az-cli

```
az login
az acr login --name <acr-name>
sudo usermod -aG docker $USER
```

4.  Please log out of your SSH session and log back in to see if the changes take effect. After logging back in, retry the Azure ACR login command (az acr login --name <container-registry>)
5.  Run docker app, you need to map right port to either 80 or 443 so it can be accessible outside vm

```
docker pull realtestchallenge.azurecr.io/web:latest
docker run --name nextjsazure -d -p 80:8000 realtestchallenge.azurecr.io/web:latest
docker ps
docker logs nextjsazure
docker stop nextjsazure
docker rm nextjsazure
```

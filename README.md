
# NodeJS OpenMRS OpenHim Mediator
This [OpenHIM](https://github.com/jembi/openhim-core-js) Mediator is intended create patients and record encounters stored in a MySQL database table. This mediator is one of two used by Namibia PTracker for records transferred from ODK Central to OpenMRS. 

# Private Configurations
The `private-config.json` is used to store all the credentials and connection URLs of the mediator. The credentials are currently left out, so the file needs to be renamed with all the required credentials and URLs before installation for the mediator to work.

# Installation


# Running in Localhost

To run the mediator without connecting it to the OpenHIM server, you can use the following commands if you have `Node.js` installed:

1. `cd openmrs-mediator`

2. `npm install`

3. `npm start`

# Running in Docker

The mediator can be built and run using the `docker-compose.yml` file configurations.

1. Navigate to `openmrs-mediator` folder where the  `docker-compose.yml` is.

2. `docker-compose build`

3. `docker-compose up -d`

4. `docker network create openHIM`


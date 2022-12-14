const express = require("express");
const privateConfig = require('./config/private-config.json');
const db = require('./models');
const app = express();
const PORT = privateConfig.appConfig.PORT
const pushData = require('./openmrs/pushODKData.js') 
const { getQueryParameters } = require('./openhim/initialize');

//openHIM
getQueryParameters();

app.all('*', async (req, res) => {
  // Starts when a new request is triggered by the polling channel
  console.log(`\n---------------------------------------------------------------------------------`,
    `\n${ new Date().toUTCString('en-GB', { timeZone: 'UTC' }) }  - `,
    `The ODK Central staging tables <=> ptracker Mediator has received a new request. \n`
  );
  pushData.pushODKData(getQueryParameters().sql_limit_number).then(result => {
    try {
      res.json(`PTracker Data from ODK Central sent successfully to openmrs.,${getQueryParameters().sql_limit_number}`);
      console.log(`PTracker Data from ODK Central sent successfully to openmrs.,${getQueryParameters().sql_limit_number}`);
    } catch (error) {
        console.error(`Error sending data to PTracker: ${error}`)
    }
  }) 
});


//Server PORT
db.sequelize.sync({}).then((req) => {
  app.listen(privateConfig.appConfig.PORT, (err) => {
      if (err) console.log(`Error: ${err}`)
      console.log(`${privateConfig.appConfig.mediatorName}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
  });
}).then(() => {
  console.log(`Succesfully connected to '${privateConfig.development.database}' database...  \n`);

}).catch(err => { console.log(`Error when connecting to '${privateConfig.development.database}' database...:: \n`, err) })
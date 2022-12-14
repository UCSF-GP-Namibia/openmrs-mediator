// upsert record into MYSQL
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const privateConfig = require('../config/private-config.json');

async function readData(model,sqlLimit) {
  const foundItems = await model.findAll({
    limit: sqlLimit,
    where: {
      [Op.or]: [{ openmrs_status: null }]
    },
    order: [['createdAt']]
  });
  return foundItems;
}

async function readPendingData(model,sqlLimit) {
  const foundItems = await model.findAll({
    limit: sqlLimit,
    where: {
      [Op.or]: [{ openmrs_status: "pending" }]
    },
    order: [['createdAt']]
  });
  return foundItems;
}

async function updateOpenMRSStatus(model, submission_uuid, message) {
  const foundItem = await model.findOne({
    where: { submission_uuid: submission_uuid },
  });
  if (foundItem) {
    const item = await model.update(
      { openmrs_status: message },
      { where: { submission_uuid: submission_uuid } }
    );
    return { item, created: false };
  }
}

async function updateOpenmrsErrorMessage(model, submission_uuid, error) {
  const foundItem = await model.findOne({
    where: { submission_uuid: submission_uuid },
  });
  if (foundItem) {
    const item = await model.update(
      { openmrs_error_message: error },
      { where: { submission_uuid: submission_uuid } }
    );
    return { item, created: false };
  }
}

//L & D status
async function updateOpenMRSStatusLD(model, infant_id, message) {
  const foundItem = await model.findOne({ where: { infant_id: infant_id } });
  if (foundItem) {
    const item = await model.update(
      { openmrs_status: message },
      { where: { infant_id: infant_id } }
    );
    return { item, created: false };
  }
}

async function updateOpenmrsErrorMessageLD(model, infant_id, error) {
  const foundItem = await model.findOne({ where: { infant_id: infant_id } });
  if (foundItem) {
    const item = await model.update(
      { openmrs_error_message: error },
      { where: { infant_id: infant_id } }
    );
    return { item, created: false };
  }
}

async function getInfants(model, ptrackerId,sqlLimit) {
  infants = model.findAll({
    limit: sqlLimit,
    where: {
      [Op.or]: [{ openmrs_status: null }, { openmrs_status: "created" }],
      [Op.and]: { ptracker_id: ptrackerId },
    },
    order: [['createdAt']]
  });
  return infants;
}

module.exports = {
  readData,
  updateOpenMRSStatus,
  getInfants,
  updateOpenmrsErrorMessage,
  updateOpenMRSStatusLD,
  updateOpenmrsErrorMessageLD,
  readPendingData
};

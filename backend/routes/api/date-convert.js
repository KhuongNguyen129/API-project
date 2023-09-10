const convertDateFormat = (date) => {
  return date.toISOString().replace("T", " ").split(".")[0];
};

const convertOnlyDate = (date) => {
  return date.toISOString().split("T")[0];
};

module.exports = { convertDateFormat, convertOnlyDate };

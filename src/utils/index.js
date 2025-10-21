"use strict";

const _ = require("lodash");

const getDataInfo = ({ object = {}, field = [] }) => {
    return _.pick(object, field);
};

const omitDataInfo = ({ object = {}, field = [] }) => {
    return _.omit(object, field);
};

module.exports = {
    getDataInfo,
    omitDataInfo,
};

"use strict";

const _ = require("lodash");

const getDataInfo = ({ object = {}, field = [] }) => {
    return _.pick(object, field);
};

module.exports = {
    getDataInfo,
};

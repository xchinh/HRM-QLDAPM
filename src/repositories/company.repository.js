"use strict";

const companySettings = require("../models/CompanySetting.model");

class CompanyRepository {
    static findOne = async ({ queries = {}, order }) => {
        return companySettings.findOne({
            where: queries,
            order: order || [["createdAt", "DESC"]],
        });
    };
}

module.exports = CompanyRepository;

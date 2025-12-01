"use strict";

module.exports = {
    STATUS_LEAVE: {
        PENDING: "001",
        APPROVED: "002",
        REJECTED: "003",
    },
    STATUS_ATTENDANCE: {
        PRESENT: "004",
        ABSENT: "005",
        LEAVE: "006",
        LATE: "007",
    },
    ROLE: {
        ADMIN: "0001",
        MANAGER: "0002",
        HR: "0003",
        EMPLOYEE: "0004",
    },
    STATUS_PAYROLL: {
        DRAFT: "0005",
        CALCULATED: "0006",
        APPROVED: "0007",
    },
};

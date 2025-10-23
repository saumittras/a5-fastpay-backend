"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["AGENT"] = "AGENT";
})(Role || (exports.Role = Role = {}));
var status;
(function (status) {
    status["PENDING"] = "PENDING";
    status["ACTIVE"] = "ACTIVE";
    status["BLOCKED"] = "BLOCKED";
    status["FROZEN"] = "FROZEN";
    status["CLOSED"] = "CLOSED";
    status["DELETED"] = "DELETED";
    status["SUSPEND"] = "SUSPEND";
})(status || (exports.status = status = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TX_Status = exports.TX_Type = void 0;
var TX_Type;
(function (TX_Type) {
    TX_Type["ADD_MONEY"] = "ADD_MONEY";
    TX_Type["WITHDRAW"] = "WITHDRAW";
    TX_Type["SEND_MONEY"] = "SEND_MONEY";
    TX_Type["BILL_PAY"] = "BILL_PAY";
})(TX_Type || (exports.TX_Type = TX_Type = {}));
var TX_Status;
(function (TX_Status) {
    TX_Status["PENDING"] = "PENDING";
    TX_Status["COMPLETED"] = "COMPLETED";
    TX_Status["REVERSED"] = "REVERSED";
    TX_Status["FAILED"] = "FAILED";
})(TX_Status || (exports.TX_Status = TX_Status = {}));

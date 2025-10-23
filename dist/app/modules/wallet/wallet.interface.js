"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStatus = exports.WalletType = void 0;
var WalletType;
(function (WalletType) {
    WalletType["USER"] = "USER";
    WalletType["AGENT"] = "AGENT";
    WalletType["PENDINGAGENT"] = "PENDINGAGENT";
})(WalletType || (exports.WalletType = WalletType = {}));
var WalletStatus;
(function (WalletStatus) {
    WalletStatus["UNVERIFIED"] = "UNVERIFIED";
    WalletStatus["BLOCKED"] = "BLOCKED";
    WalletStatus["ACTIVE"] = "ACTIVE";
    WalletStatus["SUSPENDED"] = "SUSPEND";
})(WalletStatus || (exports.WalletStatus = WalletStatus = {}));

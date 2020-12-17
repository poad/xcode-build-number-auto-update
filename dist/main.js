"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const bundleNumber = __importStar(require("./bundleNumber"));
function run() {
    try {
        const path = core.getInput("path");
        const newNumber = core.getInput("new-number");
        const autoIncrement = core.getInput("auto-increment");
        let nextNumber;
        if (autoIncrement !== "true") {
            if (newNumber === undefined) {
                throw new Error("Unless you specify true for auto-increment, new-number must be specified!");
            }
            nextNumber = newNumber;
        }
        else {
            const currentNumber = +bundleNumber.get(path);
            nextNumber = `${currentNumber + 1}`;
        }
        core.info(`Update to ${nextNumber}`);
        bundleNumber.update(path, nextNumber);
        core.setOutput("dest-number", newNumber);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
run();

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sdk = void 0;
const client_1 = require("./http/client");
const config_1 = require("./config");
class Sdk {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = new client_1.ApiClient(config_1.API_URL, apiKey);
    }
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.post('/api/user', Object.assign(Object.assign({}, data), { todo: 'todo' }));
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.delete(`/api/user/${userId}`);
        });
    }
    userLogged(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.post('/api/user/logged', { userId });
        });
    }
    userProgression(userId_1, circuitId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, circuitId, amount = 1) {
            yield this.client.post('/api/progression', { userId, circuitId, amount });
        });
    }
}
exports.Sdk = Sdk;

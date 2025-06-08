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
exports.ApiClient = void 0;
class ApiClient {
    constructor(baseURL, token) {
        this.token = token;
        this.baseURL = baseURL;
        this.headers = Object.assign({ 'Content-Type': 'application/json' }, (token ? { Authorization: `Bearer ${token}` } : {}));
    }
    request(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseURL}${url}`, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, this.headers), options.headers) }));
            if (!response.ok) {
                const error = yield response.json();
                throw new Error(error.message);
            }
            return response.json();
        });
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, { method: 'GET' });
        });
    }
    post(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, {
                method: 'POST',
                body: data ? JSON.stringify(data) : null,
            });
        });
    }
    delete(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(url, {
                method: 'DELETE',
                body: data ? JSON.stringify(data) : null,
            });
        });
    }
}
exports.ApiClient = ApiClient;

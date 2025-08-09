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
exports.Ludiks = void 0;
class Ludiks {
    /**
     * Configure global API key and base URL for all SDK calls
     * @param apiKey Your Ludiks API key
     * @param baseUrl Optional custom base URL (defaults to https://api.ludiks.io)
     */
    static configure(apiKey, baseUrl) {
        this.globalApiKey = apiKey;
        this.globalBaseUrl = baseUrl || this.defaultBaseUrl;
    }
    /**
     * Get the current global configuration
     */
    static getConfig() {
        if (!this.globalApiKey) {
            throw new Error('Ludiks SDK not configured. Please call Ludiks.configure() first.');
        }
        return {
            apiKey: this.globalApiKey,
            baseUrl: this.globalBaseUrl || this.defaultBaseUrl,
        };
    }
    static initUser(optionsOrUser) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let apiKey;
            let baseUrl;
            let user;
            if ('apiKey' in optionsOrUser) {
                // Legacy format with all options
                apiKey = optionsOrUser.apiKey;
                baseUrl = (_a = optionsOrUser.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
                user = optionsOrUser.user;
            }
            else {
                // New format using global config
                const config = this.getConfig();
                apiKey = config.apiKey;
                baseUrl = config.baseUrl;
                user = optionsOrUser;
            }
            const res = yield fetch(`${baseUrl}/api/end-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    picture: user.picture,
                    metadata: user.metadata,
                }),
            });
            if (!res.ok) {
                throw new Error(`Failed to init user: ${res.status}`);
            }
        });
    }
    static trackEvent(optionsOrUserId, eventName, value, timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let apiKey;
            let baseUrl;
            let userId;
            let finalEventName;
            let finalValue;
            let finalTimestamp;
            if (typeof optionsOrUserId === 'string') {
                // New format using global config
                const config = this.getConfig();
                apiKey = config.apiKey;
                baseUrl = config.baseUrl;
                userId = optionsOrUserId;
                finalEventName = eventName;
                finalValue = value;
                finalTimestamp = timestamp;
            }
            else {
                // Legacy format with all options
                apiKey = optionsOrUserId.apiKey;
                baseUrl = (_a = optionsOrUserId.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
                userId = optionsOrUserId.userId;
                finalEventName = optionsOrUserId.eventName;
                finalValue = optionsOrUserId.value;
                finalTimestamp = optionsOrUserId.timestamp;
            }
            try {
                const res = yield fetch(`${baseUrl}/api/tracking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        userId,
                        eventName: finalEventName,
                        value: finalValue,
                        timestamp: finalTimestamp,
                    }),
                });
                if (!res.ok) {
                    throw new Error(`Failed to track event: ${res.status}`);
                }
                return yield res.json();
            }
            catch (err) {
                console.error('Ludiks trackEvent error:', err);
                throw err;
            }
        });
    }
    static getProfile(optionsOrUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let apiKey;
            let baseUrl;
            let userId;
            if (typeof optionsOrUserId === 'string') {
                // New format using global config
                const config = this.getConfig();
                apiKey = config.apiKey;
                baseUrl = config.baseUrl;
                userId = optionsOrUserId;
            }
            else {
                // Legacy format with all options
                apiKey = optionsOrUserId.apiKey;
                baseUrl = (_a = optionsOrUserId.baseUrl) !== null && _a !== void 0 ? _a : this.defaultBaseUrl;
                userId = optionsOrUserId.userId;
            }
            const res = yield fetch(`${baseUrl}/api/end-user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Failed to get profile: ${res.status}`);
            }
            return yield res.json();
        });
    }
}
exports.Ludiks = Ludiks;
Ludiks.defaultBaseUrl = 'https://api.ludiks.io';
Ludiks.globalApiKey = null;
Ludiks.globalBaseUrl = null;

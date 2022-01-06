"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SstService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let SstService = class SstService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('SstService');
    }
    generateToken(payload, secret) {
        return this.jwtService.sign(this.generatePayload(payload), { secret });
    }
    generatePayload(_payload) {
        if (!_payload.iss) {
            throw new Error('IssClaimEmptyError');
        }
        if (!_payload.sub) {
            throw new Error('SubClaimEmptyError');
        }
        const payload = {
            iss: _payload.iss,
            role: _payload === null || _payload === void 0 ? void 0 : _payload.role,
            sub: _payload.sub,
            iat: new Date().getTime() / 1000
        };
        return payload;
    }
    verify(token, options) {
        return this.jwtService.verify(token, options);
    }
    decode(token, options) {
        return this.jwtService.decode(token, options);
    }
};
SstService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SstService);
exports.SstService = SstService;

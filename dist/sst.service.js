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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SstService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sst_constants_1 = require("./sst.constants");
const ms_1 = __importDefault(require("ms"));
let SstService = class SstService {
    constructor(options, jwtService) {
        this.options = options;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('SstService');
    }
    generateToken(subject, secret) {
        return this.jwtService.sign(this.generatePayload(subject), { secret });
    }
    generatePayload(subject) {
        var _a, _b, _c;
        const iat = new Date().getTime() / 1000;
        const payload = {
            iss: this.options.sst.iss,
            role: (_a = this.options.sst) === null || _a === void 0 ? void 0 : _a.role,
            sub: subject,
            iat,
            exp: this.options.sst.exp ? iat + (0, ms_1.default)(((_c = (_b = this.options.signOptions) === null || _b === void 0 ? void 0 : _b.expiresIn) === null || _c === void 0 ? void 0 : _c.toString()) || '120ms') : undefined
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
    __param(0, (0, common_1.Inject)(sst_constants_1.SST_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], SstService);
exports.SstService = SstService;

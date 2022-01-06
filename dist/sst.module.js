"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SstModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SstModule = void 0;
const common_1 = require("@nestjs/common");
const sst_service_1 = require("./sst.service");
const jwt_1 = require("@nestjs/jwt");
const sst_constants_1 = require("./sst.constants");
let SstModule = SstModule_1 = class SstModule {
    static register(options) {
        return {
            module: SstModule_1,
            providers: [{ provide: sst_constants_1.SST_MODULE_OPTIONS, useValue: options || {} }]
        };
    }
};
SstModule = SstModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [sst_service_1.SstService, jwt_1.JwtService],
        exports: [sst_service_1.SstService]
    })
], SstModule);
exports.SstModule = SstModule;

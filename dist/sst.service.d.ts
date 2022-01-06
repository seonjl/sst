import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { SstModuleOptions } from './interfaces';
export declare class SstService {
    private readonly options;
    private jwtService;
    private readonly logger;
    constructor(options: SstModuleOptions, jwtService: JwtService);
    generateToken(claim: {
        role?: string;
        subject?: string;
    }, secret?: string): string;
    private generatePayload;
    verify(token: string, options?: JwtVerifyOptions): any;
    decode(token: string, options?: jwt.DecodeOptions): null | {
        [key: string]: any;
    } | string;
}

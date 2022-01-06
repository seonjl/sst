import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
export declare class SstService {
    private jwtService;
    private readonly logger;
    constructor(jwtService: JwtService);
    generateToken(payload: any, secret?: string): string;
    private generatePayload;
    verify(token: string, options?: JwtVerifyOptions): any;
    decode(token: string, options?: jwt.DecodeOptions): null | {
        [key: string]: any;
    } | string;
}

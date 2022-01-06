import { JwtModuleOptions } from '@nestjs/jwt';
export interface SstPayload {
    iss: string;
    role?: string;
    sub: string;
    iat: number;
    exp?: number;
}
export interface SstModuleOptions extends JwtModuleOptions {
    sst: {
        iss: string;
        role: string;
    };
}

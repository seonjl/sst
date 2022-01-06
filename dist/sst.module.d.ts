import { DynamicModule } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare class SstModule {
    static register(options: JwtModuleOptions): DynamicModule;
}

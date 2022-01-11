import { ModuleMetadata, Type } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface SstPayload {
    // [key: string]: any;
    iss: string
    role?: string
    sub: string
    iat: number
    exp?: number
  }

export interface SstModuleOptions extends JwtModuleOptions {
  sst: {
    iss: string,
    role: string,
  }
}

export interface SstOptionsFactory {
  createSstOptions(): Promise<SstModuleOptions> | SstModuleOptions;
}
export interface SstModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SstOptionsFactory>;
  useClass?: Type<SstOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SstModuleOptions> | SstModuleOptions;
  inject?: any[];
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SstService } from './sst.service';
import { JwtModule, JwtModuleAsyncOptions, JwtOptionsFactory, JwtService } from '@nestjs/jwt';
import { SST_MODULE_OPTIONS } from './sst.constants';
import { SstModuleOptions } from '.';

@Module({
  providers: [SstService, JwtService],
  exports: [SstService],
})
export class SstModule {
  static register (options: SstModuleOptions): DynamicModule {
    return {
      module: SstModule,
      providers: [{ provide: SST_MODULE_OPTIONS, useValue: options || {}, }],
    };
  }
}

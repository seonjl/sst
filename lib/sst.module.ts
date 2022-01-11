import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SstService } from './sst.service';
import { JwtModule, JwtModuleAsyncOptions, JwtOptionsFactory, JwtService } from '@nestjs/jwt';
import { SST_MODULE_OPTIONS } from './sst.constants';
import { SstModuleAsyncOptions, SstModuleOptions, SstOptionsFactory } from '.';

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

  static registerAsync (options: SstModuleAsyncOptions): DynamicModule {
    return {
      module: SstModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders (
    options: SstModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      }
    ];
  }

  private static createAsyncOptionsProvider (
    options: SstModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SST_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SST_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SstOptionsFactory) =>
        await optionsFactory.createSstOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}

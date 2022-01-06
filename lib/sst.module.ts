import { DynamicModule, Module, Provider } from '@nestjs/common'
import { SstService } from './sst.service'
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt'
import { SST_MODULE_OPTIONS } from './sst.constants'

@Module({
  providers: [SstService, JwtService],
  exports: [SstService]
})
export class SstModule {
  static register (options: JwtModuleOptions): DynamicModule {
    return {
      module: SstModule,
      providers: [{ provide: SST_MODULE_OPTIONS, useValue: options || {} }]
    }
  }
}

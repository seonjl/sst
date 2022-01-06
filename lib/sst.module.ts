import { DynamicModule, Module, Provider } from '@nestjs/common'
import { SstService } from './sst.service'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

@Module({
  providers: [SstService],
  exports: [SstService]
})
export class SstModule {
  static register (options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [{ provide: 'SST_MODULE_OPTIONS', useValue: options || {} }]
    }
  }
}

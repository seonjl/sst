import { DynamicModule, Module, Provider } from '@nestjs/common'
import { SstService } from './sst.service'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

@Module({
  imports: [JwtModule],
  providers: [SstService],
  exports: [SstService]
})
export class SstModule {
  static register (options: JwtModuleOptions): DynamicModule {
    return {
      module: SstModule,
      providers: [{ provide: 'SST_MODULE_OPTIONS', useValue: options || {} }]
    }
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'
import { SstModuleOptions, SstPayload } from './interfaces'
import { SST_MODULE_OPTIONS } from './sst.constants';
import ms from 'ms'

@Injectable()
export class SstService {
  private readonly logger = new Logger('SstService');

  // eslint-disable-next-line no-useless-constructor
  constructor (
    @Inject(SST_MODULE_OPTIONS) private readonly options: SstModuleOptions,
    private jwtService: JwtService,
  ) {}

  generateToken (subject: string, secret?: string) {
    return this.jwtService.sign(this.generatePayload(subject), { secret })
  }

  private generatePayload (subject: string) : SstPayload {
    
    const iat = new Date().getTime() / 1000
    const payload = {
      iss: this.options.sst.iss,
      role: this.options.sst?.role,
      sub: subject,
      iat,
      exp: this.options.sst.exp ? iat + ms(this.options.signOptions?.expiresIn?.toString() || '120ms') : undefined
    }

    return payload
  }

  verify (token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verify(token, options)
  }

  decode (token: string, options?: jwt.DecodeOptions): null | {
    [key: string]: any;
} | string {
    return this.jwtService.decode(token, options)
  }
}

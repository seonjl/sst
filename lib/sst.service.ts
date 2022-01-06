import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'
import { SstModuleOptions, SstPayload } from './interfaces'
import { SST_MODULE_OPTIONS } from './sst.constants'
import ms from 'ms'

@Injectable()
export class SstService {
  private readonly logger = new Logger('SstService');

  // eslint-disable-next-line no-useless-constructor
  constructor (
    @Inject(SST_MODULE_OPTIONS) private readonly options: SstModuleOptions,
    private jwtService: JwtService
  ) {}

  generateToken (claim: {role?: string, subject?: string}, secret?: string) {
    const token = this.jwtService.sign(this.generatePayload(claim), { secret })
    return token
  }

  private generatePayload (claim) : SstPayload {
    const { role, subject } = claim
    const iat = Math.floor(new Date().getTime() / 1000)
    const payload = {
      iss: this.options.sst.iss,
      role: role || this.options.sst?.role,
      sub: subject,
      iat
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

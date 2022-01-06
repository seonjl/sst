import { Inject, Injectable, Logger } from '@nestjs/common'
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'
import { SstPayload } from './interfaces'

@Injectable()
export class SstService {
  private readonly logger = new Logger('SstService');

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private jwtService: JwtService
  ) {}

  generateToken (payload:any, secret?: string) {
    return this.jwtService.sign(this.generatePayload(payload), { secret })
  }

  private generatePayload (_payload:{iss: string, sub: string, [key: string]: any;}) : SstPayload {
    if (!_payload.iss) {
      throw new Error('IssClaimEmptyError')
    }
    if (!_payload.sub) {
      throw new Error('SubClaimEmptyError')
    }

    const payload = {
      iss: _payload.iss,
      role: _payload?.role,
      sub: _payload.sub,
      iat: new Date().getTime() / 1000
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

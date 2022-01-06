/* eslint-disable no-undef */

import { JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { SstModule } from './sst.module'
import { SstService } from './sst.service'
import * as jwt from 'jsonwebtoken'
import { SstModuleOptions } from '.'

const setup = async (config: SstModuleOptions) => {
  const module = await Test.createTestingModule({
    imports: [SstModule.register(config)]
  }).compile()

  return module.get<SstService>(SstService)
}

const config = {
  sst: {
    iss: 'jest:sstService',
    role: 'testing'
  },
  secret: 'B'
}

describe('sstService', () => {
  let sstService: SstService

  beforeAll(async () => {
    sstService = await setup({ ...config })
  })

  it('should be defined', () => {
    expect(sstService).toBeDefined()
  })
  it('공통 비밀키로 token 생성 및 검증', () => {
    const subject = '<target-id>'
    const token = sstService.generateToken({ subject })
    expect(jwt.decode(token)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)

    })
    expect(jwt.verify(token, config.secret)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    })
    expect(() => jwt.verify(token, 'fake key')).toThrowError()
  })

  it('특정 비밀키로 token 생성 및 검증', () => {
    const subject = '<target-id>'
    const token = sstService.generateToken({ subject }, 'custom key')

    expect(jwt.decode(token)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    })
    expect(jwt.verify(token, 'custom key')).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    })
    expect(() => jwt.verify(token, 'fake key')).toThrowError()
  })
})

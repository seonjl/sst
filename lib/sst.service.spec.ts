
import { JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { SstModule } from './sst.module';
import { SstService } from './sst.service';
import * as jwt from 'jsonwebtoken'

const setup = async (config: JwtModuleOptions) => {
  const module = await Test.createTestingModule({
    imports: [SstModule.register(config)]
  }).compile();

  return module.get<SstService>(SstService);
};


const config = {
  secretOrKeyProvider: (requestType: JwtSecretRequestType) =>
    requestType === JwtSecretRequestType.SIGN ? 'S' : 'V',
  secret: 'B',
  publicKey: 'C',
  privateKey: 'D'
};


describe('sstService', () => {
  let sstService: SstService;

  beforeAll(async () => {
    sstService = await setup({ ...config, secretOrKeyProvider: undefined });
  });

  it('should be defined', () => {
    expect(sstService).toBeDefined();
  });
  it('공통 비밀키로 token 생성 및 검증', async () => {

    const payload = {
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
    }
    const token = await sstService.generateToken(payload)

    expect(jwt.decode(token)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    });
    expect(jwt.verify(token, config.secret)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    });
    expect(() => jwt.verify(token, 'fake key')).toThrowError()
  });

  it('특정 비밀키로 token 생성 및 검증', async () => {

    const payload = {
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
    }
    const token = await sstService.generateToken(payload, 'custom key')

    expect(jwt.decode(token)).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    });
    expect(jwt.verify(token, 'custom key')).toEqual({
      iss: 'jest:sstService',
      role: 'testing',
      sub: '<target-id>',
      iat: expect.any(Number)
    });
    expect(() => jwt.verify(token, 'fake key')).toThrowError()
  });
});
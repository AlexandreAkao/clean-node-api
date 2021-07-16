import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('any_secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('any_secret')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = new JwtAdapter('any_secret')
    jest
      .spyOn(jwt, 'sign')
      .mockImplementationOnce(async () => new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adpter', () => {
  test('Should return if validator returns false', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })
})

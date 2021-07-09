import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from './validation'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: EmailValidator

  constructor(fieldName: string, emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
    this.fieldName = fieldName
  }

  validate(input: any): Error {
    const isValidEmail = this.emailValidator.isValid(input[this.fieldName])

    if (!isValidEmail) {
      return new InvalidParamError(this.fieldName)
    }

    return null as unknown as Error
  }
}

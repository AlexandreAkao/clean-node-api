import { EmailValidator } from './../protocols/email-validator'
import { httpResponse, httpRequest } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/http-helper'
import { InvalidParamError } from '../errors/InvalidParamError'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      return { statusCode: 0, body: '' }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}

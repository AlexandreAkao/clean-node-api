import { httpResponse, httpRequest } from '../protocols/http'
import { MissingParamError } from '../errors/MissingParamError'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return { statusCode: 0, body: '' }
  }
}

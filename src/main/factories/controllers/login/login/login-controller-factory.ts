import { Controller } from '../../../../../presentation/protocols/controller'
import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLoginValidation())
  )
}

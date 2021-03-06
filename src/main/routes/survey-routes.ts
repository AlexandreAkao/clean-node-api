import { Router } from 'express'

import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { adapterRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
}

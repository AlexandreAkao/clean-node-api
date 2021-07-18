import {
  HttpRequest,
  AddSurvey,
  AddSurveyModel,
  Validation
} from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { badRequest } from '../../../helpers/http/http-helper'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

const makeValidation = (): Validation => {
  class ValidationSutb implements Validation {
    validate(input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationSutb()
}

const makeAddSurvey = (): AddSurvey => {
  class AddSurveySutb implements AddSurvey {
    async add(data: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveySutb()
}

interface SutTypes {
  sut: AddSurveyController
  validationSutb: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validationSutb = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationSutb, addSurveyStub)

  return {
    sut,
    validationSutb,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSutb } = makeSut()
    const validateSpy = jest.spyOn(validationSutb, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSutb } = makeSut()
    jest.spyOn(validationSutb, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})

import { HttpRequest } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { Validation } from '../../../protocols'

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

interface SutTypes {
  sut: AddSurveyController
  validationSutb: Validation
}

const makeSut = (): SutTypes => {
  const validationSutb = makeValidation()
  const sut = new AddSurveyController(validationSutb)

  return {
    sut,
    validationSutb
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
})

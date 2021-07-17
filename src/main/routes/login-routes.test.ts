import { Collection } from 'mongodb'
import request from 'supertest'
import { hash } from 'bcrypt'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Alexandre',
          email: 'alexandreakira@mail.com',
          password: '12345',
          passwordConfirmation: '12345'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should 200 on login', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        name: 'Alexandre',
        email: 'alexandreakira@mail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'alexandreakira@mail.com',
          password: '12345'
        })
        .expect(200)
    })

    test('Should 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'alexandreakira@mail.com',
          password: '12345'
        })
        .expect(401)
    })
  })
})

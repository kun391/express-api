import app from '../'
import requestSupertest from 'supertest-as-promised'

export const Request = requestSupertest(app)

jest.mock('../repository/user-repository.js') // se mockea el repositorio para controlar su comportamiento en los tests
jest.mock('jsonwebtoken') // se mockea jsonwebtoken para simular la generación y verificación de tokens sin depender de su implementación real
jest.mock('bcrypt') // se mockea bcrypt para simular el hashing y comparación de contraseñas sin depender de su implementación real
jest.mock('../config/mail.config.js') // se mockea el transporter de mail para simular el envío de correos sin depender de un servicio real

import userRepository from '../repository/user-repository.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mail_transporter from '../config/mail.config.js'
import authController from '../controllers/auth.controller.js'

// Función auxiliar para crear un objeto res simulado con métodos encadenables
const makeRes = () => {
	const res = {}
	res.status = jest.fn().mockReturnValue(res)
	res.json = jest.fn().mockReturnValue(res)
	res.cookie = jest.fn().mockReturnValue(res)
	res.clearCookie = jest.fn().mockReturnValue(res)
	return res
}

// Limpia los mocks antes de cada test
beforeEach(() => {
	jest.clearAllMocks()
})

describe('AuthController', () => {
	describe('register', () => {
		test('debe retornar 400 cuando faltan campos', async () => {
			const req = { body: { email: '', password: '', username: '' } }
			const res = makeRes()

			await authController.register(req, res)

			expect(res.status).toHaveBeenCalledWith(400)
			expect(res.json).toHaveBeenCalled()
		})

		test('debe retornar 400 cuando el email ya existe', async () => {
			userRepository.findByEmail.mockResolvedValue({ _id: '1' })
			userRepository.findByUsername.mockResolvedValue(null)

			const req = { body: { email: 'a@b.com', password: 'pass', username: 'u' } }
			const res = makeRes()

			await authController.register(req, res)

			expect(userRepository.findByEmail).toHaveBeenCalledWith('a@b.com')
			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe retornar 400 cuando el username ya existe', async () => {
			userRepository.findByEmail.mockResolvedValue(null)
			userRepository.findByUsername.mockResolvedValue({ _id: '1' })

			const req = { body: { email: 'a@b.com', password: 'pass', username: 'u' } }
			const res = makeRes()

			await authController.register(req, res)

			expect(userRepository.findByUsername).toHaveBeenCalledWith('u')
			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe registrar el usuario y enviar email de verificación', async () => {
			userRepository.findByEmail.mockResolvedValue(null)
			userRepository.findByUsername.mockResolvedValue(null)
			userRepository.create.mockResolvedValue({})
			bcrypt.hash.mockResolvedValue('hashed')
			jwt.sign.mockReturnValue('token123')
			mail_transporter.sendMail.mockResolvedValue({})

			const req = { body: { email: 'a@b.com', password: 'pass', username: 'u' } }
			const res = makeRes()

			await authController.register(req, res)

			expect(userRepository.create).toHaveBeenCalled()
			expect(mail_transporter.sendMail).toHaveBeenCalled()
			expect(res.status).toHaveBeenCalledWith(201)
		})

		test('debe retornar 500 si falla el envío de email', async () => {
			userRepository.findByEmail.mockResolvedValue(null)
			userRepository.findByUsername.mockResolvedValue(null)
			userRepository.create.mockResolvedValue({})
			bcrypt.hash.mockResolvedValue('hashed')
			jwt.sign.mockReturnValue('token123')
			mail_transporter.sendMail.mockRejectedValue(new Error('smtp'))

			const req = { body: { email: 'a@b.com', password: 'pass', username: 'u' } }
			const res = makeRes()

			await authController.register(req, res)

			expect(res.status).toHaveBeenCalledWith(500)
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }))
		})
	})

	describe('login', () => {
		test('debe retornar 400 cuando faltan campos', async () => {
			const req = { body: { identifier: '', password: '' } }
			const res = makeRes()

			await authController.login(req, res)

			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe retornar 401 cuando el usuario no existe', async () => {
			userRepository.findByIdentifier.mockResolvedValue(null)
			const req = { body: { identifier: 'x', password: 'p' } }
			const res = makeRes()

			await authController.login(req, res)

			expect(res.status).toHaveBeenCalledWith(401)
		})

		test('debe retornar 401 cuando la contraseña es incorrecta', async () => {
			const user = { password: 'hashed' }
			userRepository.findByIdentifier.mockResolvedValue(user)
			bcrypt.compare.mockResolvedValue(false)

			const req = { body: { identifier: 'x', password: 'p' } }
			const res = makeRes()

			await authController.login(req, res)

			expect(res.status).toHaveBeenCalledWith(401)
		})

		test('debe retornar 401 cuando el email no está verificado', async () => {
			const user = { password: 'hashed', verify_email: false }
			userRepository.findByIdentifier.mockResolvedValue(user)
			bcrypt.compare.mockResolvedValue(true)

			const req = { body: { identifier: 'x', password: 'p' } }
			const res = makeRes()

			await authController.login(req, res)

			expect(res.status).toHaveBeenCalledWith(401)
		})

		test('debe iniciar sesión, setear cookie y devolver el usuario sin la contraseña', async () => {
			const user = {
				_id: '1',
				password: 'hashed',
				verify_email: true,
				toObject() { return { _id: '1', password: 'hashed', name: 'u' } }
			}
			userRepository.findByIdentifier.mockResolvedValue(user)
			bcrypt.compare.mockResolvedValue(true)
			jwt.sign.mockReturnValue('tok')

			const req = { body: { identifier: 'x', password: 'p' } }
			const res = makeRes()

			await authController.login(req, res)

			expect(res.cookie).toHaveBeenCalled()
			expect(res.status).toHaveBeenCalledWith(200)
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ user: expect.any(Object) }))
		})
	})

	describe('verifyEmail', () => {
		test('debe retornar 400 cuando falta el token', async () => {
			const req = { params: {} }
			const res = makeRes()

			await authController.verifyEmail(req, res)

			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe retornar 404 cuando el usuario no existe', async () => {
			jwt.verify.mockReturnValue({ email: 'a@b.com' })
			userRepository.findByEmail.mockResolvedValue(null)

			const req = { params: { token: 't' } }
			const res = makeRes()

			await authController.verifyEmail(req, res)

			expect(res.status).toHaveBeenCalledWith(404)
		})

		test('debe verificar el email cuando el token es válido', async () => {
			jwt.verify.mockReturnValue({ email: 'a@b.com' })
			const user = { _id: '1', verify_email: false }
			userRepository.findByEmail.mockResolvedValue(user)
			userRepository.updateUser.mockResolvedValue({})

			const req = { params: { token: 't' } }
			const res = makeRes()

			await authController.verifyEmail(req, res)

			expect(userRepository.updateUser).toHaveBeenCalledWith('1', { verify_email: true })
			expect(res.status).toHaveBeenCalledWith(200)
		})
	})

	describe('dashboardUser', () => {
		test('debe retornar 404 cuando el usuario no existe', async () => {
			userRepository.findById.mockResolvedValue(null)
			const req = { user: { id: '1' } }
			const res = makeRes()

			await authController.dashboardUser(req, res)

			expect(res.status).toHaveBeenCalledWith(404)
		})

		test('debe retornar 200 con el usuario cuando existe', async () => {
			const user = { _id: '1', name: 'u' }
			userRepository.findById.mockResolvedValue(user)
			const req = { user: { id: '1' } }
			const res = makeRes()

			await authController.dashboardUser(req, res)

			expect(res.status).toHaveBeenCalledWith(200)
			expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ user }))
		})
	})

	describe('sendChangePasswordEmail', () => {
		test('debe retornar 400 cuando falta el email', async () => {
			const req = { body: {} }
			const res = makeRes()

			await authController.sendChangePasswordEmail(req, res)

			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe retornar 404 cuando el usuario no existe', async () => {
			userRepository.findByEmail.mockResolvedValue(null)
			const req = { body: { email: 'a@b.com' } }
			const res = makeRes()

			await authController.sendChangePasswordEmail(req, res)

			expect(res.status).toHaveBeenCalledWith(404)
		})

		test('debe enviar email de restablecimiento cuando el usuario existe', async () => {
			const user = { _id: '1', email: 'a@b.com' }
			userRepository.findByEmail.mockResolvedValue(user)
			jwt.sign.mockReturnValue('tokenpwd')
			mail_transporter.sendMail.mockResolvedValue({})

			const req = { body: { email: 'a@b.com' } }
			const res = makeRes()

			await authController.sendChangePasswordEmail(req, res)

			expect(mail_transporter.sendMail).toHaveBeenCalled()
			expect(res.status).toHaveBeenCalledWith(200)
		})
	})

	describe('changePassword', () => {
		test('debe retornar 400 cuando falta el token o la contraseña', async () => {
			const req = { params: {}, body: {} }
			const res = makeRes()

			await authController.changePassword(req, res)

			expect(res.status).toHaveBeenCalledWith(400)
		})

		test('debe retornar 404 cuando el usuario no existe', async () => {
			jwt.verify.mockReturnValue({ id: '1' })
			userRepository.findById.mockResolvedValue(null)

			const req = { params: { token: 't' }, body: { password: 'p' } }
			const res = makeRes()

			await authController.changePassword(req, res)

			expect(res.status).toHaveBeenCalledWith(404)
		})

		test('debe cambiar la contraseña cuando los datos son válidos', async () => {
			jwt.verify.mockReturnValue({ id: '1' })
			const user = { _id: '1' }
			userRepository.findById.mockResolvedValue(user)
			bcrypt.hash.mockResolvedValue('newhashed')
			userRepository.updateUser.mockResolvedValue({})

			const req = { params: { token: 't' }, body: { password: 'p' } }
			const res = makeRes()

			await authController.changePassword(req, res)

			expect(userRepository.updateUser).toHaveBeenCalledWith('1', { password: 'newhashed' })
			expect(res.status).toHaveBeenCalledWith(200)
		})
	})

	describe('logout', () => {
		test('debe limpiar la cookie y retornar 200', async () => {
			const req = {}
			const res = makeRes()

			await authController.logout(req, res)

			expect(res.clearCookie).toHaveBeenCalledWith('token', expect.any(Object))
			expect(res.status).toHaveBeenCalledWith(200)
		})
	})
})


import userRepository from "../repository/user-repository.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from "bcrypt";
import mail_transporter from "../config/mail.config.js";

dotenv.config()

class AuthController {
    async register(req, res) {

        try {
            const { email, password, username } = req.body

            const userEmail = await userRepository.findByEmail(email)

            const userUsername = await userRepository.findByUsername(username)

            if (userEmail) {
                return res.status(400).json({message: `Usuario con email ${email} ya registrado`})
            }

            if (userUsername) {
                return res.status(400).json({message: `Usuario con username ${username} ya registrado`})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await userRepository.create(email, hashedPassword, username)

            const token_generated = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' })

            try {
                await mail_transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Verificacion de cuenta - UTN SLACK',
                    html: `<h1>Gracias por registrarte en UTN SLACK</h1>
                           <p>Por favor, haz click en el siguiente enlace para verificar tu cuenta:</p>
                           <a href="http://localhost:3000/api/auth/verify-email?verification_email_token=${token_generated}">Verificar cuenta</a>`
                })
            } catch (error) {
                return res.status(500).json({ message: 'Error al enviar el email de verificacion', error: error.message })
            }

            return res.status(201).json({ message: 'Usuario registrado con exito. Te enviamos un email de verificacion.' })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al registrarse', error: error.message })
        }
    }

    async login(req, res) {
        try {
            const { identifier, password } = req.body

            const userFounded = await userRepository.findByIdentifier(identifier)

            if (!userFounded) {
                return res.status(401).json({ message: 'Credenciales incorrectas' })
            }

            const passwordHashed = await bcrypt.compare(password, userFounded.password)

            if (!passwordHashed) {
                return res.status(401).json({ message: 'Credenciales incorrectas' })
            }

            if (identifier == '' || password == '') {
                return res.status(400).json({ message: 'Email o contraseña vacios' })
            }

            if (!userFounded.verify_email) {
                return res.status(401).json({ message: 'Por favor, verifica tu email antes de iniciar sesion' })
            }

            const token = jwt.sign({ id: userFounded._id }, process.env.SECRET_KEY)

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', samesite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' })

            const userObject = userFounded.toObject()
            delete userObject.password

            return res.status(200).json({ message: 'Sesion iniciada con exito', user: userObject })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al iniciar sesion', error: error.message })
        }
    }

    async verifyEmail(req, res) {
        try {
            const { verification_email_token } = req.query

            if (!verification_email_token) {
                return res.status(400).json({ message: 'Token de verificacion no proporcionado' })
            }

            const decoded = jwt.verify(verification_email_token, process.env.SECRET_KEY)

            const user = await userRepository.findByEmail(decoded.email)

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }

            if (user.verify_email) {
                return res.status(400).json({ message: 'Email ya verificado' })
            }

            await userRepository.updateUser(user._id, { verify_email: true })

            return res.status(200).json({ message: 'Email verificado con exito' })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al verificar el email', error: error.message })
        }
    }

    async dashboardUser(req, res) {
        try{
            const userId = req.user.id
            const user = await userRepository.findById(userId)
            if(!user) {
                return res.status(404).json({ authorized: false })
            }
            return res.status(200).json({ message: 'Dashboard del usuario', user: user })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al obtener el dashboard del usuario', error: error.message })
        }
    }
}

const authController = new AuthController()
export default authController
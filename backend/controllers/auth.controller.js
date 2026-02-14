import userRepository from "../repository/user-repository.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import mail_transporter from "../config/mail.config.js";

class AuthController {
    async register(req, res) {

        try {
            const { email, password, username } = req.body

            if (!email || !password || !username) {
                return res.status(400).json({ message: 'Faltan campos requeridos: email, password, username' })
            }

            const userEmail = await userRepository.findByEmail(email)

            const userUsername = await userRepository.findByUsername(username)

            if (userEmail) {
                return res.status(400).json({ message: `Usuario con email ${email} ya registrado` })
            }

            if (userUsername) {
                return res.status(400).json({ message: `Usuario con username ${username} ya registrado` })
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
                           <a href="${process.env.FRONTEND_URL}/verificar-email/${token_generated}">Verificar cuenta</a>`
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

            if (!identifier || !password) {
                return res.status(400).json({ message: 'Faltan campos requeridos: identifier, password' })
            }

            const userFounded = await userRepository.findByIdentifier(identifier)

            if (!userFounded) {
                return res.status(401).json({ message: 'Credenciales incorrectas' })
            }

            const passwordHashed = await bcrypt.compare(password, userFounded.password)

            if (!passwordHashed) {
                return res.status(401).json({ message: 'Credenciales incorrectas' })
            }

            if (!userFounded.verify_email) {
                return res.status(401).json({ message: 'Por favor, verifica tu email antes de iniciar sesion' })
            }

            const token = jwt.sign({ id: userFounded._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1d' })

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24
            })

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
            const { token } = req.params

            if (!token) {
                return res.status(400).json({ message: 'Token de verificacion no proporcionado' })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

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
        try {
            const userId = req.user.id
            const user = await userRepository.findById(userId)

            if (!user) {
                return res.status(404).json({ authorized: false })
            }

            return res.status(200).json({ message: 'Dashboard del usuario', authorized: true, user: user })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al obtener el dashboard del usuario', error: error.message })
        }
    }

    async sendChangePasswordEmail(req, res) {
        try {
            const { email } = req.body

            if (!email) {
                return res.status(400).json({ message: 'Email es requerido' })
            }

            const user = await userRepository.findByEmail(email)

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }

            const token_generated = jwt.sign({ id: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '3h' })

            const resetLink = `${process.env.FRONTEND_URL}/cambiar-clave/${token_generated}`


            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Recuperar contraseña',
                html: `<h1>Recuperar contraseña - UTN SLACK</h1>
                        <p>Para cambiar tu contraseña, haz click en el siguiente enlace: <a href="${resetLink}">Cambiar contraseña</a></p>`
            })

            return res.status(200).json({ message: 'Te enviamos un email para cambiar la contraseña' })

        }
        catch (error) {
            return res.status(500).json({ message: 'Error al enviar el email para cambiar la contraseña', error: error.message })
        }
    }

    async changePassword(req, res) {
        try {
            const { password } = req.body

            const { token } = req.params

            if (!token || !password) {
                return res.status(400).json({ message: 'Faltan campos requeridos: token, password' })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const user = await userRepository.findById(decoded.id)

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' })
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await userRepository.updateUser(user._id, { password: hashedPassword })

            return res.status(200).json({ message: 'Contraseña cambiada con exito' })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al cambiar la contraseña', error: error.message })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            })
            return res.status(200).json({ message: 'Sesion cerrada con exito' })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al cerrar sesion', error: error.message })
        }
    }
}

const authController = new AuthController()
export default authController
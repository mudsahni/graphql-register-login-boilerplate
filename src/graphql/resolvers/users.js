import User from '../../models/User.js'
import bcrypt from 'bcrypt'
import { UserInputError } from 'apollo-server'
import { validateRegisterInput, validateLoginInput } from '../../util/validators.js'
import jwt from 'jsonwebtoken'
import config from '../../../config.js'


const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,


    }, config.SECRET_KEY, { expiresIn: '1h' })
}
const userResolvers = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password)

            if (!valid) {
                throw new UserInputError("Erros", { errors })
            }
            const user = await User.findOne({ username })

            if (!user) {
                errors.general = "User not found."
                throw new UserInputError("User not found.", { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                errors.general = "Incorrect credentials"
                throw new UserInputError("Incorrect credentials", { errors })
            }
            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // Validate user data
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError("Errors", { errors })
            }
            // Make sure user doesnt exist
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError("Username is already taken.", {
                    errors: {
                        username: "This username is taken."
                    }
                })
            }
            // hash password and create auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()
            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

export default userResolvers
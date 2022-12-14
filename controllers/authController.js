import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
  const { name, email, password } = req.body
  // check if all values provided
  if (!name || !password || !email) {
    throw new BadRequestError('Please provide all values')
  }
  // check for duplicated email
  const dup = await User.findOne({ email })
  if (dup) {
    throw new BadRequestError('email already used')
  }
  const user = await User.create({ name, email, password })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    },
    token,
    location: user.location,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new UnauthenticatedError('Invalid Credential')
  }
  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credential')
  }

  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

const updateUser = async (req, res) => {
  console.log(req.body)
  const { name, lastName, email, location } = req.body
  if (!name || !lastName || !email || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findById({ _id: req.user.userId })
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}

export { register, login, updateUser }

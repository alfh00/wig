import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please Provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'Last Name',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'My City',
  },
})

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  // console.log(this.isModified('name'))
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const pass = this.password
  const isMatch = await bcrypt.compare(candidatePassword, pass)
  return isMatch
}

export default mongoose.model('User', UserSchema)

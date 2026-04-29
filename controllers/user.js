
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  APIError   =require("../utilities/errors")

const getAllUsers = async (_req, res,next) => {
  try {
    let users = await userModel.find();
    res.status(200).json({ data: users });
  } catch (e) {
    next(e)

  }
}


const saveUser= async (req, res,next) => {
    const user = req.body
    try {
        const newUser = await userModel.create(user)
        res.status(201).json({ data: newUser })
    } catch (e) {     
        next(e)
    }
} 

const getUserById= async (req,res,next) => {
    try {
        let user = await userModel.findOne({ _id: req.params.id} )
        if (user) res.status(200).json({ data: user })
        else throw new APIError( 404,"there is no user with this id")
    } catch (e) {
        next(e)
    }
}

const login= async (req,res,next) => {
    let {email,password}= req.body
    try {
        if (!email || !password) {
            throw new APIError(400,"please provide email and password")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new APIError(401, 'Invalid email or password' )
        }
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new APIError( 401, 'Invalid email or password' )
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET)
        res.status(200).json({ data: token  })
    } catch (e) {
        next(e)        
    }
}





//lab
const getUserByName= async (req,res,next) => {
    try {
        const {name} = req.query
        const user = await  userModel.findOne({ name })
        if (user) res.status(200).json({data:user})
        else {
            res.status(404).json({ message: "There is no user with name: " + name })
        }
    } catch (e) {
        next(e)
    }
}

   
const deleteAllUsers=  async (req,res,next) => {
    try {
        await userModel.deleteMany()
        res.status(200).json({ message: "users have been deleted successfully" })
    } catch (e) {
        next(e)
    }
}

module.exports = { saveUser, getAllUsers, getUserByName,deleteAllUsers,getUserById,login }
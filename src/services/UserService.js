const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken,genneralRefreshToken } = require("./jwtService")
// const { updateUser } = require("../controllers/UserController")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'the email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if(createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        }catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            
           
                if(!comparePassword){
                    resolve({
                        status: 'OK',
                        message: 'the password or user is incorrect',
                    })
                }
                const access_token = await genneralAccessToken ({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await genneralRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                console.log('access_token', access_token)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token
                })
    
        }catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
           const checkUser = await User.findOne({
            _id: id,
           }) 
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'the user is not defined'
                })
            }
            const updateUser = await User.findByIdAndUpdate(id, data , {new: true})
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updateUser
                })
    
        }catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser,
    loginUser,
    updateUser
}
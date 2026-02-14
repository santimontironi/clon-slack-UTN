import User from "../models/User.model.js"

class UserRepository{
    async create(email,password,username){
        const userCreaed = new User({
            email,
            password,
            username
        })

        await userCreaed.save()

        return userCreaed
    }

    async findById(id){
        const user = await User.findById(id)
        return user
    }
    
    async findByIdentifier(identifier){
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })
        return user
    }

    async findByEmail(email){
        const user = await User.findOne({email})
        return user
    }

    async findByUsername(username){
        const user = await User.findOne({username})
        return user
    }

    async deleteUser(idUser){
        const userDeleted = await User.findByIdAndDelete(idUser)

        return userDeleted
    }

    async desactiveUser(idUser){
        const userUpdated = await User.findByIdAndUpdate(idUser,{active:false}, {new: true})

        return userUpdated
    }

    async getAllUsers(){
        const users = await User.find()
        console.log(users)
        return users
    }

    async getUserById(id){
        const user = await User.findById(id)

        return user
    }

    async updateUser(idUser, newData){
        const userUpdated = await User.findByIdAndUpdate(idUser, newData, {new: true})

        return userUpdated
    }

    async changePassword(idUser, newPassword){
        const userUpdated = await User.findByIdAndUpdate(idUser, {password: newPassword}, {new: true})
        return userUpdated
    }
}

const userRepository = new UserRepository()
export default userRepository
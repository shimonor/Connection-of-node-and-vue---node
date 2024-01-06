const { UserModel } = require("../models/index");
const Joi = require("joi");

class UserService {

    static async findAllUsers() {
        return await UserModel.findAll();
    }

    static async findUserById(id) {
        const user = await UserModel.findByPk(id);
        if (!user) throw new Error("User not found");
        return user;
    }

    static async findUserByEmail(email) {
        const user = await UserModel.findOne({ where: { email } });
        return user;
    }

    static async createUser(data) {
        const user = await UserModel.create(data);
        user.token = user.generateJWT();
        await user.save();
        return user;
    }

    static async updateUserById(id, data) {
        const user = await this.findUserById(id);
        user.set(data);
        await user.save();
        return user;
    }

    static async deleteUserById(id) {
        const user = await this.findUserById(id);
        await user.destroy();
        return user;
    }

    static async login(email) {
        const user = await this.findUserByEmail(email);
        user.token = user.generateJWT();
        await user.save();
        return user;
    }


    static validateUser(body) {
        const userSchema = Joi.object({
            username: Joi.string().required().min(2).max(30),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(20),
            address: Joi.string().required(),
            role: Joi.string().required().valid('admin', 'user'),
            status: Joi.string().required().valid('active', 'inactive')
        });
        return userSchema.validate(body);
    }

    static validateLogin(body) {
        const loginSchema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(6).max(20)
        });
        return loginSchema.validate(body);
    }
}

module.exports = UserService;

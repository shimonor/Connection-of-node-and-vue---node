const bcrypt = require("bcrypt");
const User = require("../services/user-service");

class System {

    static async getAll(req, res) {
        try {
            const users = await User.findAllUsers();
            if (!users || users.length === 0) {
                return res.status(404).json({ msg: 'No users found' });
            }

            return res.status(200).json({ count: users.length, users });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    static async getUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findUserById(id);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            return res.status(200).json({ msg: 'User found', user });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    static async addUser(req, res) {
        try {
            const { error } = User.validateUser(req.body);
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const existingUser = await User.findUserByEmail(req.body.email);
            if (existingUser) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);
            
            const newUser = await User.createUser(req.body);

            return res.status(201).json({ msg: 'User successfully created', newUser });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }


    static async updateUser(req, res) {
        try {
            const { error } = User.validateUser(req.body);
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const id = req.params.id;
            const user = await User.findUserById(id);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            if (req.body.email !== user.email) {
                const userWithNewEmail = await User.findUserByEmail(req.body.email);
                if (userWithNewEmail) {
                    return res.status(400).json({ msg: 'Email already exists' });
                }
            }

            req.body.password = await bcrypt.hash(req.body.password, 10);

            const updatedUser = await User.updateUserById(id, req.body);
            return res.status(200).json({ msg: 'User updated successfully', updatedUser });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    static async delUser(req, res) {
        try {
            const id = req.params.id;
            const deletedUser = await User.deleteUserById(id);
            if (!deletedUser) {
                return res.status(404).json({ msg: 'User not found' });
            }

            return res.status(200).json({ msg: 'User deleted successfully' });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { error } = User.validateLogin(req.body);
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const user = await User.findUserByEmail(req.body.email);
            if (!user) {
                return res.status(400).json({ msg: 'Authentication failed' });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.dataValues.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Authentication failed' });
            }

            const authenticateUser = await User.login(req.body.email);
            return res.status(200).json({ msg: 'Authentication successful',user: authenticateUser });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = System;

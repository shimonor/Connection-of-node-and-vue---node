const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/user-db.js")

const User = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.ENUM("admin", "user")
    },
    token: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM("active", "inactive")
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
});

User.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
}

User.prototype.toAuthJSON = function () {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = User;

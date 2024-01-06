const sequelize = require("../config/user-db.js")
const UserModel = require("./user-model")



const syncModels = async (delAll) => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ force: delAll });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}


module.exports =  {syncModels, sequelize, UserModel}

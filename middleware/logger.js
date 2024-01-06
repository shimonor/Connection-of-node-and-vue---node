const myLog = (req, res, next) => {
    console.log("user enter in", Date.now());
    next();
}
 
module.exports = myLog
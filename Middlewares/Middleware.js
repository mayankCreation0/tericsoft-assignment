const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        // console.log(token);
        if (token) {
            token = token.split(" ")[1];
            console.log(token);
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.userid = user.id;
            // console.log(user._id)
            // console.log(req.userid);
        }
        else {
            console.log("Unauthorized user");
            res.status(400).json({ message: 'Unauthorized user' })
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Unauthorized user' })
    }
}
module.exports = auth;
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const db = require('../db/mongoose')

// create new user
createUser = async (req, res)=> {
    const {email, password,role} = req.body;
    // check the email address
    const findUser = await User.find({email});
    if (findUser.length) {
        return res.status(400).send('Email already exist!');
    }
    // if not exist, create new user
    try {
        const user = new User({email, password, role});
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
};

// reset password by email
resetPassword = async (req, res) => {
    const {email, password} = req.body;
    const findUser = await User.find({email});
    if (!findUser.length) {
        return res.status(400).send('Cannot find Email Address.');
    }
    try {
        const encryptedPassword = await bcrypt.hash(password,
            bcrypt.genSaltSync(10));
        const updatedUser = await User.where({email})
            .updateOne({password: encryptedPassword});
        res.status(200).send(updatedUser);
    } catch (e) {
        res.status(400).send(e);
    }
};

login = async (req, res)=> {
    try {
        const user = await User.findByCredentials(req.body.email,
            req.body.password);
        const token = await user.generateAuthToken();
        req.cookies['token'] = token;
        req.session.userId = user._id;
        req.session.userRole = user.role;
        req.session.userName = user.username;
        req.session.token = token;
        res.status(200).send({user: user,token:token});
    } catch (e) {
        res.status(400).send(e);
    }
};
logout = async (req, res) => {
    try {
        // filter token
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token !== req.token;
        });
        // save updated token
        await req.user.save();
        res.status(200).send('Logout Success!');
    } catch (e) {
        res.status(400).send(e);
    }
};

module.exports = {
    createUser,
    resetPassword,
    login,
    logout,
};

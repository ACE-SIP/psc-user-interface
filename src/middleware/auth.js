const jwt = require('jsonwebtoken');
const User = require('../model/User');
const auth = async (req, res, next) => {
    try {
        // console.log(res);
        // const token1 = res.header('Authorization').replace('Bearer ', '');
        const token = req.header('Authorization').replace('Bearer ', '');
        // const key = Object.keys(res.header().req.sessionStore.sessions);
        // const token2 = JSON.parse(res.header().
        // req.sessionStore.sessions[key[0]]).token;
        // console.log('Token2:', token2);
        const decoded = jwt.verify(token, 'mysignature');
        const user = await User.findOne({'_id': decoded._id,
            'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        // add user && token to req
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send('[Authenticate Error]');
    }
};
module.exports = auth;

const authenticate = (req, res, next) => {
    console.log(req.session);
    console.log('userid: ', req.session.user_id);
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticate};
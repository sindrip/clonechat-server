const authenticate = (req, res, next) => {
    if (req.session && req.session.user_id) {
        next();
    } else {
        res.sendStatus(401);
    }
};

module.exports = {authenticate};
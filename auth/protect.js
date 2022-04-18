//js
const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) { // this middleware is able to use a quick if statement to allow client access to the next() middleware if client is authenticated
        return next();
    }
    console.log('Please log in to continue');
    res.redirect('/login'); // res.redirect("/login")--> redirect client to the login page if they are not authenticated
}
const allowIf = (req, res, next) => {
    if (!req.isAuthenticated()) { // where am I setting up isAuthenticated function?
        return next();
    }
    res.redirect('/dashboard');
}

module.exports = {
    protectRoute,
    allowIf,
};
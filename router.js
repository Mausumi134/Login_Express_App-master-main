var express = require("express");
var router = express.Router();
const credentials = [
    { email: "admin@gmail.com", password: "admin123" },
    { email: "anshi@gmail.com", password: "1234" },
    { email: "user@gmail.com", password: "password2" }
];
// login user
router.post('/login', (req, res)=>{
    const { email, password } = req.body;
    const validCredential = credentials.find(cred => cred.email === email && cred.password === password);
    if(validCredential){
        req.session.user = email;
        res.redirect('/route/dashboard');
    }else{
        res.end("Invalid Username or Password");
    }});
// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', { user: req.session.user });
    }else{
        res.send("Unauthorized User");
    }});
// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base', { title: "Express", logout: "Logout Successfully" });
        }
    });
});
module.exports = router;

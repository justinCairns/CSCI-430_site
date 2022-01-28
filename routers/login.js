const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {

    const email = req.query.email
    const password = req.query.password

    if (email === undefined || password === undefined) {
        return res.render('login')
    }
    
    if (email === 'eric@example.com' && password === 'test') {
        res.send({
            status: 200,
            token: "abc123"
        })
    }
    else {
        res.send({
            status: 401
        })
    }
})

module.exports = router
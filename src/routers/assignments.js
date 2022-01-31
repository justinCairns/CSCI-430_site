const express = require('express')
const router = express.Router()

router.get('/assignments', (req, res) => {
    res.render('assignments')
})

module.exports = router
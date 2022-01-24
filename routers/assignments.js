const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/assignments', (req, res) => {
    const dir = path.join(__dirname,"../templates/assignments.html")
    res.sendFile(dir)
})

module.exports = router
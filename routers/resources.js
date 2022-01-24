const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/resources', (req, res) => {
    const dir = path.join(__dirname,"../templates/resources.html")
    res.sendFile(dir)
})

module.exports = router
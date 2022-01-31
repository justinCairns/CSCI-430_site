const express = require('express')
const path = require('path')
const hbs = require('hbs')

const indexRouter = require('../public/routers/index') 
const assignmentsRouter = require('../public/routers/assignments') 
const resourcesRouter = require('../public/routers/resources') 
const loginRouter = require('../public/routers/login') 
const createAccountRouter = require('../public/routers/create-account') 
const mainRouter = require('../public/routers/main') 
const _404Router = require('../public/routers/404')

const app = express()

const dir = path.join(__dirname, "../public")
app.use(express.static(dir))

app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, "../templates")
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

app.use(indexRouter) 
app.use(assignmentsRouter) 
app.use(resourcesRouter)
app.use(loginRouter)
app.use(createAccountRouter)
app.use(mainRouter)    
app.use(_404Router) 

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
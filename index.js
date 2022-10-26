const express = require('express')
const app = express()
app.use(express.json())
var cors = require('cors')
app.use(cors())
app.set('view engine', 'ejs')
const {Usuario} = require('./models')
var expressLayouts = require('express-ejs-layouts')
app.set('layout', 'layout/layout')  
 app.use(expressLayouts)
 require('dotenv').config()

//Html
app.get('/home', async (req,res) => {
    const post = await Usuario.findAll()   
    res.render('pages/index', {props: post})  
} )
app.get('/post/:id', async (req,res) => {
    const id = req.params.id  
    const post = await Usuario.findByPk(id)
    res.render('pages/post', {props: post})
})
  
app.listen(8080, ()=> {
    console.log('rodando na 8080')
} )
const rotaProdutos = require('./rotas/produtos/index')
app.use('/produtos', rotaProdutos)
app.use('/static', express.static('public'))

const rotauser = require('./rotas/user/index')
app.use('/usuarios', rotauser ) 

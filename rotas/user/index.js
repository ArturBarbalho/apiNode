const express = require('express')
const router = express.Router()
const userMid = require('../../validações/user/user.middleware')
const { user } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
router.post('/', userMid)
router.post('/', async (req,res) => {
    const senha = req.body.senha
    const salt = await bcrypt.genSalt(10)//gera codigo aleatorio e unico para proteger a senha
    const senhaCriptografada = await bcrypt.hash(senha, salt)
    const post = {email: req.body.email, senha: senhaCriptografada}
    const usuario = await user.create(post)
    res.json({usuario:"Usuário criado com sucesso!", iserId: usuario.id })
})

router.get('/', async (req,res)=>{
   const post = await user.findAll()
    res.json({usuarios: post})
})

router.post('/login', userMid, async (req,res) => {
    const email = req.body.email
    const senha = req.body.senha

    const usuario = await user.findOne({
        where:{email:email}
    })

    if(usuario && (await bcrypt.compare(senha, usuario.senha)) ){
        const payload = {sub: usuario.id, email: usuario.email}
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'50s'})
       
        res.json({accessToken: token})
        
    }
    else {
        res.status(403).json({msg:"Usuário ou senha inválidos"})
    }
    })  

module.exports = router
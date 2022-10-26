const express = require('express')
const router = express.Router()
const {Usuario} = require('../../models')  //tem q ser o nome que ta na classe do models
const validar = require('../../validações/produtos/produto.middleware')
var  multer   =  require ( 'multer' ) 
const { response } = require('express')
const path = require('path')
const autenticar = require('../../validações/token/token.middleware')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }  
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg/i
    if (extensoes.test(path.extname(file.originalname))){
            cb(null, true)
    }else{
            return cb('Arquivo não suportado. Apenas jpg e jpeg são suportados.')
    }  
}  
var upload = multer({ storage: storage, fileFilter: fileFilter })

//router.post('/', validar)  
router.post('/', upload.single('foto'))

router.post('/upload', upload.single('foto'), async(req,res) => {
    res.json({msg:req.file.filename})     
          
        
} ) 

//adicionar produto 
router.post('/', async(req, res) => {
    const post = req.body
    if(req.file){post.foto = `/static/uploads/${req.file.filename}`}  
    
     await Usuario.create(post)

    res.json({ msg:post}) 
} )
//mostrar produtos
router.get('/', async (req, res) => {
    const post = await Usuario.findAll()
    res.json({post })  
  
} )
//remover produto
router.get('/:id', async (req,res)=> {
    const id = req.params.id
    const post = await Usuario.findByPk(id)
    await post.destroy()  
    res.redirect('http://localhost:8080/home')
    //res.json({msg:"removido"}) 

} )

module.exports = router
const express = require('express');
const app = express();
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// register partials
hbs.registerPartials(partialsDir)

app.set('view engine','hbs')
app.set('views', viewsDir )
app.use(express.static(publicDir))

// get requests
app.get('', (req,res)=>{
    res.render('index',{name:'james mungai',organisation: 'coders.com, title: home'})
})
app.get('/contacts',(req, res)=>{
    const data = req.body
    res.render('contacts',{name:'james mungai',organisation: 'coders., title: contacts'})
})
app.get('/about',(req, res)=>{
    const data = req.body
    res.render('about',{name:'james mungai',organisation: 'coders.com, title: about'})
})
app.get('/help', (req, res)=>{
    res.render('help',{name:'james mungai',organisation: 'coders.com, title: about'})
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send('Kindly provide address')
    }
    console.log(req.query.address)
    geocode(req.query.address,(error, response)=>{
        if(error){
            res.send({error})
        }else{
            const coordinates = response
            forecast(coordinates, (error, response)=>{
                if(error){
                    res.send({error})
                }else{
                    const{currently}= response
                    res.send({currently})
                }
            })
        }
    })
})

app.get('/help*', (req,res)=>{
    res.render('404page', {message: 'help page not available'}) 
})
app.get('*', (req,res)=>{
    res.render('404page', {message:'page does npt exist'})
})


app.listen(port,'localhost',()=>{
    console.log( 'listening on port 3000')

})

const hbs = require('hbs')
const path = require('path')
const express = require('express')
const { title } = require('process')
const { error } = require('console')

const geocode = require('./utils/geocode')
const forecast = require('./utils/weathercode')


//  const { title } = 
//  require('process')

const app = express()

// Define paths for Express config
const publicDirectoryPtah = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') 

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve     
app.use(express.static(publicDirectoryPtah ))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sagar kumar',
        para: 'use this site to get weather',

    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Sagar Kumar',
        para: 'use this site to get weather',

    })

})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page',
        helpText:'hi this a custom help ',
        name: 'Sagar Kumar',
        para: 'use this site to get weather',

    })
})

app.get('/weather', (req, res) =>{

    if (!req.query.address) {
        res.send({
            error: 'please provide address'
        })
    }

       geocode(req.query.address,(error,{latitude, longitude, location } = {} ) =>{
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude, (error, weatherData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location,
                forecast: weatherData.temp,
                address: req.query.address
            })

        })

       })

  
})

app.get('/products', (req, res) =>{ 
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product:[ ]
    }) 
})
 
app.get('/help/*', (req, res) =>{
 res.render('404',{
            title: '404',
            errorMsg: 'help article not found',
        })    
})

app.get('*', (req, res) => {
        res.render('404',{
            title: '404',
            errorMsg: 'Page not found',
        })
    
})



app.listen(3000, () =>{
    console.log('server is up on port 3000')
})
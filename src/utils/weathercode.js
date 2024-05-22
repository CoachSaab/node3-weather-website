const request = require('request')

const weathercode = (latitude,longitude, callback) =>{
    const url =  'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=51a12660b0423aaa368e2160c9506d56&units=metric'

    request({url, json:true},(error, {body}) => {
        if(error){
            callback('unable to connect to location',undefined)
        }else if(body.length === 0){
            callback('unable to find location',undefined)
        }else {
                //callback(null,{temp: response.body.main.temp},' current the temprature');
                callback(null, { temp: body.main.temp }, 'current temperature is');


            }
    })
}

module.exports = weathercode
 const { error } = require('console')
 const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q='+address+'&limit=5&appid=51a12660b0423aaa368e2160c9506d56'

    request({url, json:true},(error, {body}) => {
        if(error){
            callback('unable to connect to location services!', undefined)
        }else if (body.length === 0) {
            callback('unable to find location .Try another search', undefined)
        }
        else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].name
            })
        }
    })
}

module.exports=geocode
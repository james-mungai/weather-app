const request = require('request')

function getWeather(coordinates, callback){
    const url = `https://api.darksky.net/forecast/419a1c0a37bbb6fee9cd32068a040f41/${coordinates[0]},${coordinates[1]}`
    request({url:url, json: true}, (error, response)=>{
        if(error){
            callback('could not reach weather service', undefined)
        }else if(response.error){
            callback('try another search', undefined)
        }else{
            callback(undefined, response.body)
        }
    })
}


module.exports = getWeather
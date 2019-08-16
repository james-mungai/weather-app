const request = require('request')

const geocode = (city, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1Ijoia2lyb2dvaSIsImEiOiJjano3MTZjamEwcXBuM21vNmF4aWNrYXp2In0.3Ai568CMzmKONzCvc5ECug&limit=1`
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback('cannot reach service at this moment', undefined)
        } else if(body.features[0].length===0){
            callback('please try another search', undefined)
        } else {
            callback(undefined,body.features[0].center)
        }
    })
}
module.exports = geocode
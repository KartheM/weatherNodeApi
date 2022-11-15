"use strict";
var API_KEY = '667100d97045b3055daba4522ce1b839'; 
const request = require('request'); 
module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};


exports.weatherapi =  async function(event, context) {
  // console.log("EVENT: \n" + JSON.stringify(event, null, 2))
  console.log("eventbody"+JSON.parse(event.body).latitude);
  const latitude=JSON.parse(event.body).latitude;
  const longitude= JSON.parse(event.body).longitude;
  let val=await forecast(latitude,longitude).then((data)=>{
    console.log("data"+data)
    return data;
  })
  console.log("return"+val)
  // return val;
  return {
    statusCode: 200,
    body: JSON.stringify(val)
  };
  // return context.logStreamName
}


const forecast = async function (latitude, longitude) { 
  
  var url = `http://api.openweathermap.org/data/2.5/weather?`
              +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
              console.log("url"+url)
              return new Promise(function (resolve, reject) {
         request({ url: url, json: true }, async function (error, response) { 
        console.log("inside req");
    
          if (error) { 
            console.log("inside error")
              console.log('Unable to connect to Forecast API'); 
               resolve({"error":"connection error"});
          } 
            else { 
              console.log("inside else")
    
              console.log('It is currently '
                  + response.body.main.temp
                  + ' degrees out.'
              ); 
    
              console.log('The high today is '
                  + response.body.main.temp_max 
                  + ' with a low of '
                  + response.body.main.temp_min
              ); 
    
              console.log('Humidity today is '
                  + response.body.main.humidity
              ); 
               const res={
                statusCode:response.statusCode,
                temp:response.body.main.temp,
                maxtemp:response.body.main.temp_max,
                mintemp:response.body.main.temp_min,
                humidity:response.body.main.humidity
              }
              resolve(res);
          } 

         
      }) 
    });
      // return res;
  } 
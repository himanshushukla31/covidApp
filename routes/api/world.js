const express = require('express')
const router = express.Router()
const https = require('https')
var Promise = require("bluebird");
var request = require('request-promise'); 

// const worldURL = ''

// const allCountriesURL= ""

router.get('/', (req, res) => {
  // const config = {
  //   headers: {
  //     accept: 'application/json',
  //   },
  // }
  // https.get(worldURL, config, (response) => {
  //   let body = ''
  //   response.on('data', (data) => {
  //     body += data
  //   })

  //   response.on('end', () => {
  //     covidData = JSON.parse(body)
      // const totalCase = covidData.cases
      // const recoveredCase = covidData.recovered
      // const totalDeath = covidData.deaths
      // const todayCase = covidData.todayCases
      // const todayRecovered = covidData.todayRecovered
      // const todayDeath = covidData.todayDeaths

      // res.render('home', {
      //   totalCase: totalCase,
      //   recoveredCase: recoveredCase,
      //   totalDeath: totalDeath,
      //   todayCase: todayCase,
      //   todayRecovered: todayRecovered,
      //   todayDeath: todayDeath,
      //   geometry: [ 78.9629,20.5937],
      //   Title: "World Stats"
      // })
  //   })
  // })

  // create request objects
var requests = [{
  url: 'https://disease.sh/v3/covid-19/all',
  headers: {
    accept: 'application/json'
  }
}, {
  url: 'https://api.covid19api.com/summary',
  headers: {
    accept: 'application/json',
  }
}];

Promise.map(requests, function(obj) {
  return request(obj).then(function(body) {
    return JSON.parse(body);
  });
}).then(function(results) {
  console.log(results);
    const totalCase = results[0].cases
    const recoveredCase = results[0].recovered
    const totalDeath = results[0].deaths
    const todayCase = results[0].todayCases
    const todayRecovered = results[0].todayRecovered
    const todayDeath = results[0].todayDeaths

    res.render('home', {
      totalCase: totalCase,
      recoveredCase: recoveredCase,
      totalDeath: totalDeath,
      todayCase: todayCase,
      todayRecovered: todayRecovered,
      todayDeath: todayDeath,
      geometry: [ 78.9629,20.5937],
      Title: "World Stats",
      List: results[1].Countries
    })

}, function(err) {
  res.status(500).send("Server Error")
});

})
module.exports = router

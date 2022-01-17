const express = require('express')
const router = express.Router()
// const https = require('https')
const dotenv = require('dotenv')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
var Promise = require('bluebird')
var request = require('request-promise')

dotenv.config({ path: './config/config.env' })

const geocoder = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN,
})

router.get('/', (req, res) => {
  res.render('country')
})

// const config = {
//   headers: {
//     accept: 'application/json',
//   },
// }

// https.get(countryURL, config, (response) => {
//   countryDataBody = ''
//   response.on('data', (data) => {
//     countryDataBody += data
//   })
//   response.on('end', () => {
//     const covidData = JSON.parse(countryDataBody)
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
//   geometry: geometry,
//   Title: countryName
//     })
//   })
// })

router.post('/', async function (req, res) {
  const countryName = req.body.countryName
  const countryURL = 'https://disease.sh/v3/covid-19/countries/' + countryName

  const q = countryName

  const geoData = await geocoder
    .forwardGeocode({
      query: q,
      limit: 1,
    })
    .send()
  const geometry = geoData.body.features[0].geometry.coordinates
  var requests = [
    {
      url: 'https://disease.sh/v3/covid-19/countries/' + countryName,
      headers: {
        accept: 'application/json',
      },
    },
    {
      url: 'https://api.covid19api.com/summary',
      headers: {
        accept: 'application/json',
      },
    },
  ]

  Promise.map(requests, function (obj) {
    return request(obj).then(function (body) {
      return JSON.parse(body)
    })
  }).then(function (results) {
    console.log(results)
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
      geometry: geometry,
      Title: countryName,
      List: results[1].Countries,
    })
  }),
    function (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
})
module.exports = router

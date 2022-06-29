var axios = require('axios');
require("dotenv").config();
var qs = require('qs');
var data = qs.stringify({
  'grant_type': 'client_credentials' 
});

var config = {
  method: 'post',
  url: 'https://accounts.spotify.com/api/token',
  headers: { 
    'Authorization': `Basic ${Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`, 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

module.exports =  getAccessToken = async () => {
  let response = await axios(config)
  return response
}



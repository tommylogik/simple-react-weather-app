require('dotenv').config({ path: '.env.server' });

const fastify = require('fastify')({ logger: true });
const fastifyStatic = require('fastify-static');
const fetch = require("node-fetch");
const zipcodes = require('zipcodes');
const path = require('path');

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'build'),
})

fastify.get('/', async (req, resp) => {
  resp.sendFile('index.html');
});

fastify.get('/api/', async (req, resp) => {
  if (Object.prototype.hasOwnProperty.call(req.query, 'zipcode')) {
    // change zipcode to lat,lng
    const geolocation = zipcodes.lookup(req.query.zipcode);


    if (!geolocation ||
      !Object.prototype.hasOwnProperty.call(geolocation, 'latitude') ||
      !Object.prototype.hasOwnProperty.call(geolocation, 'longitude')) {
      throw new Error("Zipcode seems to be invalid. Please try again.");
    }
    // make request to dark sky
    const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${geolocation.latitude},${geolocation.longitude}`;

    const getData = async url => {
      let json;
      try {
        const response = await fetch(url);
        json = await response.json();
      } catch (error) {
        fastify.log.error(error);
      }

      return json;
    };

    const response = await getData(weatherUrl);
    resp.code(200).send(response);
  } else {
    throw new Error("Route requires 'zipcode'");
  }
});


fastify.listen(process.env.PORT || 5000, process.env.HOST || '0.0.0.0',(err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${fastify.server.address().port}`)

});

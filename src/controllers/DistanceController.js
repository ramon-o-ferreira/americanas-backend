const NodeGeocoder = require('node-geocoder')
const { getDistance } = require('geolib')

const geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null
})

module.exports = {
    async getDistance(request, response) {
        const {
            from,
            to
        } = request.body;

        let result = await geocoder.geocode(from)
        let fromLocation = {
            'latitude': result[0]['latitude'],
            'longitude': result[0]['longitude']
        }

        result = await geocoder.geocode(to)
        let toLocation = {
            'latitude': result[0]['latitude'],
            'longitude': result[0]['longitude']
        }

        let distance = { distance: getDistance(fromLocation, toLocation) }

        //console.log(fromLocation)
        //console.log(toLocation)
        //console.log(distance)

        return response.json(distance)
    }
}
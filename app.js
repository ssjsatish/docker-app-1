const express = require('express')
const redis = require('redis')
const app = express()

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})

client.set('visits', 0)
app.get('/', (request, response) => {
    client.get('visits', (err, visits)=> {
        response.send('Number of Visits: '+ visits)
        client.set('visits', parseInt(visits)+1)
    })    
})
app.listen(8080, ()=> {
    console.log('app started and listening on port 8080')
})
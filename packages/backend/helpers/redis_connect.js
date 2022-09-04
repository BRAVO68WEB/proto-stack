const redis = require('redis')

const redis_client = redis.createClient(
    {
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
        connect_timeout: 0
    }
)

redis_client.on('connect', function () {
    console.log('Redis Client connected 🍒')
})

redis_client.on('error', function(err) {
    console.log('Redis error: ' + err);
});

module.exports = redis_client

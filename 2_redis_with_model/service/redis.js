const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient("redis://127.0.0.1:6379");

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
  console.log("redis connected");
})();

module.exports = {
  redisClient,
};

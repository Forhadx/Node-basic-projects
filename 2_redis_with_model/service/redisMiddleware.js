const { redisClient } = require("./redis");

const homeCache = async (req, res, next) => {
  let results;
  try {
    const cacheResults = await redisClient.get("all");
    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.status(200).json({
        data: results,
        Message: "result from cache successfully",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  }
};

const removeHomeCache = async (req, res, next) => {
  await redisClient.del("all");
  next();
};

module.exports = {
  homeCache,
  removeHomeCache,
};

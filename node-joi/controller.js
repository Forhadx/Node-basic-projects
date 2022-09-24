const signup = (req, res) => {
  console.log("body", req.body);
  res.json({ msg: "hi" });
};

module.exports = { signup };

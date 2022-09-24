const signup = (req, res) => {
  console.log("body", req.body);
  res.json({ msg: "hi", data: req.body });
};

module.exports = { signup };

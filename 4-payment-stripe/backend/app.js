const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_..");

const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.post("/pay", async (req, res) => {
  const { email } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5000,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
    receipt_email: email,
  });

  console.log("details: ", paymentIntent);

  res.json({ client_secret: paymentIntent["client_secret"] });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

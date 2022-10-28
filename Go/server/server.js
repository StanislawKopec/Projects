const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { isTryStatement } = require("typescript");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51LsWN6JdNbzwaE2LCjFskeqa98BpKlth8kfuYoaN0yC1UWhlqV7mP19OnAbF0VnLOjhbrUnEVJD9UDoh8YrkCbZW00YiQytLpZ"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("app running on 4242"));

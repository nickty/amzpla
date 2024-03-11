const Stripe = require("stripe");
const stripe = Stripe(process.env.JWT_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount in smallest currency unit (cents, for USD)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

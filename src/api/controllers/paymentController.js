const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_TEST_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { planId } = req.body; // Your frontend should send the ID of the plan
    console.log("check plan id", planId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: planId, // Use the Stripe Price ID here
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/#/profile",
      cancel_url: "http://localhost:5173/#/profile",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(400).send({ error: { message: error.message } });
  }
};

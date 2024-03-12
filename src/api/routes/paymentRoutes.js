const express = require("express");
const router = express.Router();

const { createPaymentIntent } = require("../controllers/paymentController");

router.post("/create-checkout-session", createPaymentIntent);

module.exports = router;

const express = require("express");
const cors = require("cors");

const app = express();
const stripe = require("stripe")(require("./config.json").stripeSecretKey);

app.use(express.json());
app.use(cors());

app.post("/user/register", async (req, res) => {
  const { email, name, password, phone } = req.body;

  /*  Add this user in your database and store stripe's customer id against the user   */
  try {
    const customer = await createStripeCustomer({ email, name, password, phone });
    console.log(customer);
    res.status(200).json({ message: "Customer created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "An error occured" });
  }
});

/* ---------------------------------------------------------------------- */

app.post("/payment/method/attach", async (req, res) => {
  const { paymentMethod } = req.body;

  /* Fetch the Customer Id of current logged in user from the database */
  const customerId = "cus_NmgRJUsOlJYHpS";

  try {
    const method = await attachMethod({ paymentMethod, customerId });
    console.log(method);
    res.status(200).json({ message: "Payment method attached succesully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Could not attach method" });
  }
});

/* ---------------------------------------------------------------------- */

app.get("/payment/methods", async (req, res) => {
  /* Query database to fetch Stripe Customer Id of current logged in user */
  const customerId = "cus_NmgRJUsOlJYHpS";

  try {
    const paymentMethods = await listCustomerPayMethods(customerId);
    res.status(200).json(paymentMethods);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not get payment methods");
  }
});

/* ---------------------------------------------------------------------- */

app.post("/payment/create", async (req, res) => {
  const { paymentMethod, amount } = req.body;

  /* Query database for getting the payment amount and customer id of the current logged in user */

  const currency = "INR";
  const userCustomerId = "cus_NmgRJUsOlJYHpS";

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      customer: userCustomerId,
      payment_method: paymentMethod,
      confirmation_method: "manual", // For 3D Security
      description: "Buy Product",
    });

    /* Add the payment intent record to your datbase if required */
    res.status(200).json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not create payment");
  }
});

/* ---------------------------------------------------------------------- */

app.post("/payment/confirm", async (req, res) => {
  const { paymentIntent, paymentMethod } = req.body;
  try {
    const intent = await stripe.paymentIntents.confirm(paymentIntent, {
      payment_method: paymentMethod,
    });

    /* Update the status of the payment to indicate confirmation */
    res.status(200).json(intent);
  } catch (err) {
    console.error(err);
    res.status(500).json("Could not confirm payment");
  }
});

/* ---------------------------------------------------------------------- */

/* Helper Functions  ----------------------------------------------------------------------------------------------------- */

async function createStripeCustomer({ name, email, phone }) {
  return new Promise(async (resolve, reject) => {
    try {
      const Customer = await stripe.customers.create({
        name: name,
        email: email,
        phone: phone,
      });

      resolve(Customer);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

async function listCustomerPayMethods(customerId) {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(customerId, {
        type: "card",
      });
      resolve(paymentMethods);
    } catch (err) {
      reject(err);
    }
  });
}

function attachMethod({ paymentMethod, customerId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentMethodAttach = await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
      });
      resolve(paymentMethodAttach);
    } catch (err) {
      reject(err);
    }
  });
}

/* -------------------------------------------------------------- */

app.listen('https://react-node-stripe-payment-server-git-main-cool-cody.vercel.app', (err) => {
  if (err) throw err;

  console.log("Server running");
});

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../../Stripe.css";
import { useSelector,useDispatch } from "react-redux";
import { selectCurrentOrder } from "../order/OrderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NfFRGILujBH9ARKjuEcr4VRCX5wMVROt3ZmjeoTHGWgDOvlNDjy7qWCnakYawQJSt0SK5x2tMjyp1PLswhM2KE100tfG2NNuS");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
    const currentOrder=useSelector(selectCurrentOrder)
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount:currentOrder.totalAmount}),
      metadata:{
        order_id:currentOrder.id
      }
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
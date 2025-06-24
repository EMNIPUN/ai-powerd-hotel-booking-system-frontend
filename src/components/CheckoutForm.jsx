import { useEffect, useState } from "react";
import { useCreateCheckoutSessionMutation } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY); 

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const CheckoutForm = ({ bookingId }) => {
  console.log(bookingId);
  const { getToken } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchClientSecret = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const res = await fetch(
          `${BACKEND_URL}/api/payments/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bookingId }),
          }
        );
        if (!res.ok) {
          throw new Error("Failed to create checkout session");
        }
        const data = await res.json();
        if (isMounted) {
          setClientSecret(data.clientSecret);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchClientSecret();
    return () => {
      isMounted = false;
    };
  }, [bookingId, getToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-2">Loading payment form...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>Failed to load payment form: {error}</p>
        <button
          className="mt-2 px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setLoading(true);
            setError(null);
            setClientSecret(null);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return null;
  }

  const options = {
    clientSecret,
  };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;

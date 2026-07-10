import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "./ui/Button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useAppStore } from "../store/useAppStore";
import { apiService } from "../services/api";

export function CheckoutForm({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuthStore();
  const { cartItems } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      if (user?.userId) {
        try {
          // 1. Prepare Order Schema payload
          const orderData = {
            customerEmail: user.email,
            customerName: user.email.split('@')[0],
            items: cartItems.map(item => ({
              productId: item.productId,
              title: item.name,
              price: item.price,
              quantity: item.quantity
            })),
            subtotal: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            shipping: 15,
            tax: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 0.08,
            total: total,
            paymentStatus: "paid" as const,
            stripePaymentIntentId: paymentIntent.id
          };

          // 2. Save order to MongoDB
          await apiService.createOrder(user.userId, orderData);

          // 3. Clear the local cart state since checkout completed
          useAppStore.setState({ cartItems: [] });
        } catch (err) {
          console.error("Failed to save completed order to backend database:", err);
        }
      }

      setIsSuccess(true);
      setIsProcessing(false);
    } else {
      setMessage("Payment status: " + paymentIntent?.status);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
        <p className="text-slate-500 mb-8 max-w-md">
          Thank you for your purchase. Your order is being processed and you will receive an email confirmation shortly.
        </p>
        <Button onClick={() => window.location.href = '/'} className="rounded-full">
          Return to Store
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
          Payment Details
        </h3>
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {message && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        size="lg"
        className="w-full rounded-full text-lg shadow-md hover:shadow-lg transition-all"
      >
        {isProcessing ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
      </Button>
      <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
        Secured by <span className="font-bold text-slate-700">stripe</span>
      </p>
    </form>
  );
}

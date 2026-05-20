import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/CheckoutForm";
import { useAppStore } from "../store/useAppStore";
import { ShieldCheck, ArrowLeft, Truck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Initialize Stripe outside of component to avoid recreating the object on renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

export function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useAppStore();
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // We only create a payment intent if there are items and we don't have a secret yet
    if (cartItems.length > 0 && !clientSecret) {
      // In a real app, you would make this fetch call to your backend
      const fetchPaymentIntent = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";
          const response = await fetch(`${baseUrl}/payments/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems }),
          });
          
          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        } catch (error) {
          console.error("Failed to fetch payment intent:", error);
        }
      };

      fetchPaymentIntent();
    }
  }, [cartItems, clientSecret]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Your Cart is Empty</h1>
        <Link to="/catalog" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
      colorText: '#0f172a',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/cart" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <ShieldCheck className="w-5 h-5" /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Checkout Section */}
          <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Checkout</h1>
            
            {/* Delivery Info Mockup */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
               <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                 Delivery Information
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-blue-500 bg-blue-50/50 p-4 rounded-xl cursor-pointer">
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-slate-900 flex items-center gap-2"><Truck className="w-4 h-4"/> Standard</span>
                        <span className="font-bold">₹15.00</span>
                     </div>
                     <p className="text-sm text-slate-500">3-5 business days</p>
                  </div>
                  <div className="border border-slate-200 hover:border-slate-300 p-4 rounded-xl cursor-pointer transition-colors">
                     <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-slate-900 flex items-center gap-2"><Clock className="w-4 h-4"/> Express</span>
                        <span className="font-bold">₹30.00</span>
                     </div>
                     <p className="text-sm text-slate-500">1-2 business days</p>
                  </div>
               </div>
            </div>

            {/* Stripe Elements Form */}
            {clientSecret ? (
              <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                <CheckoutForm total={total} />
              </Elements>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Initializing secure payment...</p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="w-full lg:w-[400px] shrink-0 lg:sticky lg:top-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
               <h3 className="font-bold text-lg mb-6 tracking-tight">Order Summary</h3>
               
               <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                 {cartItems.map(item => (
                   <div key={item.id} className="flex gap-4">
                     <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center transform scale-75">
                          {item.quantity}
                        </span>
                     </div>
                     <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-semibold text-slate-900 truncate">{item.name}</h4>
                       <p className="text-xs text-slate-500 mt-1">{item.brand}</p>
                     </div>
                     <div className="font-medium text-sm text-right shrink-0">
                       ₹{(item.price * item.quantity).toFixed(2)}
                     </div>
                   </div>
                 ))}
               </div>

               <div className="space-y-3 text-sm mb-6 border-t border-slate-100 pt-6">
                 <div className="flex justify-between text-slate-600">
                   <span>Subtotal</span>
                   <span className="font-medium text-slate-900">₹{subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-slate-600">
                   <span>Shipping</span>
                   <span className="font-medium text-slate-900">₹{shipping.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-slate-600">
                   <span>Tax (Estimated)</span>
                   <span className="font-medium text-slate-900">₹{tax.toFixed(2)}</span>
                 </div>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                 <span className="font-bold text-lg">Total</span>
                 <span className="font-bold text-2xl text-slate-900">₹{total.toFixed(2)}</span>
               </div>
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}

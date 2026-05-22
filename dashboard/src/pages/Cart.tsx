import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "../components/ui/Button";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, fetchCartItems } = useAppStore();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (user?.userId) {
      fetchCartItems(user.userId);
    }
  }, [fetchCartItems, user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center pb-64">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Please sign in to view your cart</h1>
        <p className="text-slate-500 mb-8">You need to be signed in to see and manage your personal cart items.</p>
        <Link to="/login">
          <Button size="lg" className="rounded-full px-8">Sign In</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center pb-64">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added any tech to your cart yet.</p>
        <Link to="/catalog">
          <Button size="lg" className="rounded-full">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-12">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
             {cartItems.map((item, i) => (
                <div key={item.id} className={`p-6 flex flex-col sm:flex-row gap-6 ${i !== cartItems.length - 1 ? 'border-b border-slate-200' : ''}`}>
                   <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-50 border border-slate-100" />
                   <div className="flex-1 flex flex-col justify-center">
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <div className="text-xs font-semibold text-blue-600 mb-1">{item.brand}</div>
                         <h3 className="font-bold text-slate-900 leading-snug"><Link to={`/product/${item.id}`} className="hover:text-blue-600">{item.name}</Link></h3>
                       </div>
                       <div className="font-bold text-lg">₹{item.price}</div>
                     </div>
                     <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-slate-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1))}
                            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => user?.userId && removeFromCart(item.id, user.userId)}
                          className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>

        <aside className="w-full lg:w-96 shrink-0">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sticky top-28">
             <h3 className="font-bold text-lg mb-6 tracking-tight">Order Summary</h3>
             <div className="space-y-4 text-sm mb-6 border-b border-slate-200 pb-6">
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
             <div className="flex justify-between items-center mb-8">
               <span className="font-bold text-lg">Total</span>
               <span className="font-bold text-2xl">₹{total.toFixed(2)}</span>
             </div>
             <Link to="/checkout" className="block w-full">
               <Button size="lg" className="w-full rounded-full gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
             <p className="text-xs text-center text-slate-500 mt-4">Secure checkout powered by CartFordge</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

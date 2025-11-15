"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/lib/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

type PaymentMethod = "crypto" | "card";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { address, isConnected } = useAccount();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const subtotal = getCartTotal();
  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    return (
      shippingInfo.fullName &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode
    );
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      alert("Please fill in all shipping information");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col grid-bg">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="glass p-12 rounded-xl text-center max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 mx-auto text-gray-600 mb-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some items to your cart before checking out.</p>
            <Link
              href="/store"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold glow"
            >
              Shop Merch
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col grid-bg">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="glass p-12 rounded-xl text-center max-w-2xl">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-12 h-12 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your purchase! Your order has been received and will ship soon.
            </p>
            <div className="glass p-6 rounded-lg mb-8 text-left">
              <h3 className="text-white font-semibold mb-2">Order Details:</h3>
              <p className="text-gray-400 text-sm mb-1">
                Order Total: <span className="text-white font-semibold">${total.toFixed(2)}</span>
              </p>
              <p className="text-gray-400 text-sm mb-1">
                Shipping to: <span className="text-white">{shippingInfo.fullName}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Email: <span className="text-white">{shippingInfo.email}</span>
              </p>
            </div>
            <p className="text-gray-400 mb-8">
              You'll receive a confirmation email with tracking information once your order ships.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/store"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold glow"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="px-8 py-4 glass border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="glass p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-semibold">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === "crypto"
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-4xl mb-2">💰</div>
                  <h3 className="text-white font-bold mb-1">Pay with Crypto</h3>
                  <p className="text-gray-400 text-sm">ETH, USDC on Base</p>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-4xl mb-2">💳</div>
                  <h3 className="text-white font-bold mb-1">Credit Card</h3>
                  <p className="text-gray-400 text-sm">Visa, Mastercard, Amex</p>
                </button>
              </div>

              {paymentMethod === "crypto" && (
                <div className="glass p-6 rounded-lg">
                  {isConnected ? (
                    <div>
                      <p className="text-green-400 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Wallet Connected
                      </p>
                      <p className="text-gray-400 text-sm">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-yellow-400 mb-4">
                        Please connect your wallet to pay with crypto
                      </p>
                      <p className="text-gray-400 text-sm">
                        Click the "Connect Wallet" button in the header to continue
                      </p>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-semibold">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm font-semibold">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm font-semibold">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-xl sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3 pb-4 border-b border-gray-800"
                  >
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {item.product.category === "apparel" ? "👕" : "🎒"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-400">Size: {item.selectedSize}</p>
                      )}
                      {item.selectedColor && (
                        <p className="text-xs text-gray-400">Color: {item.selectedColor}</p>
                      )}
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-white font-semibold text-sm">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between text-xl font-bold text-white">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isProcessing || (paymentMethod === "crypto" && !isConnected)}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed glow mb-4"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>

              <Link
                href="/store"
                className="block w-full py-3 glass border border-gray-700 text-gray-300 text-center rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

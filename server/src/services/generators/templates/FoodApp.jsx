import React, { useState } from 'react';
import { 
  Utensils, ShoppingBag, Star, Clock, ChefHat, Truck, CheckCircle2, 
  Sparkles, Plus, Minus, ArrowRight, ShieldCheck, User, LogOut, X, MapPin, CreditCard 
} from 'lucide-react';

const INITIAL_RESTAURANTS = [
  {
    id: 'r1',
    name: 'Trattoria Bella Roma',
    cuisine: 'Italian & Pizza',
    rating: 4.9,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    address: '42 Little Italy Ave, Manhattan'
  },
  {
    id: 'r2',
    name: 'Smash & Smokehouse Burgers',
    cuisine: 'Gourmet Burgers',
    rating: 4.8,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80',
    address: '108 West 4th St, Greenwich Village'
  },
  {
    id: 'r3',
    name: 'Sakura Zen Ramen & Sushi',
    cuisine: 'Japanese Artisan',
    rating: 4.9,
    deliveryTime: '25-35 min',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    address: '88 St Marks Pl, East Village'
  }
];

const INITIAL_DISHES = [
  {
    id: 'd1',
    restaurantId: 'r1',
    name: 'Artisan Truffle & Wild Mushroom Pizza',
    category: 'Pizza',
    price: 18.50,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80',
    description: 'Black truffle oil, wild forest mushrooms, fresh buffalo mozzarella, aromatic basil.'
  },
  {
    id: 'd2',
    restaurantId: 'r1',
    name: 'Handcrafted Rigatoni Alla Vodka',
    category: 'Pasta',
    price: 16.00,
    tag: 'Chef Special',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=600&auto=format&fit=crop&q=80',
    description: 'Slow-cooked San Marzano tomato cream sauce with crushed red pepper and Parmigiano-Reggiano.'
  },
  {
    id: 'd3',
    restaurantId: 'r2',
    name: 'Double Smoked Angus Bacon Burger',
    category: 'Burgers',
    price: 14.50,
    tag: 'Most Loved',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    description: 'Two seared Angus patties, applewood bacon, sharp cheddar, chipotle aioli on toasted brioche.'
  },
  {
    id: 'd4',
    restaurantId: 'r2',
    name: 'Truffle Parmesan Hand-Cut Fries',
    category: 'Sides',
    price: 6.99,
    tag: 'Crispy',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    description: 'Idaho Russet potatoes tossed with white truffle oil, shaved parmesan and sea salt.'
  },
  {
    id: 'd5',
    restaurantId: 'r3',
    name: 'Tokyo Tonkotsu Black Garlic Ramen',
    category: 'Ramen',
    price: 17.50,
    tag: 'Authentic',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&auto=format&fit=crop&q=80',
    description: '18-hour rich pork bone broth, tender chashu pork belly, ajitsuke tamago egg and nori.'
  },
  {
    id: 'd6',
    restaurantId: 'r3',
    name: 'Spicy Salmon & Avocado Dragon Roll',
    category: 'Sushi',
    price: 15.00,
    tag: 'Fresh Catch',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    description: 'Scottish salmon, Hass avocado, spicy sriracha mayo and toasted black sesame seeds.'
  }
];

export default function App() {
  const [view, setView] = useState('browse'); // 'browse' | 'tracking' | 'kitchen'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [cart, setCart] = useState([
    { id: 'd1', name: 'Artisan Truffle & Wild Mushroom Pizza', price: 18.50, qty: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80' },
    { id: 'd3', name: 'Double Smoked Angus Bacon Burger', price: 14.50, qty: 1, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderStage, setOrderStage] = useState(1); // 0: Placed, 1: Preparing, 2: On Way, 3: Delivered
  const [activeOrder, setActiveOrder] = useState({
    id: 'ORD-7892',
    placedAt: '10:42 PM',
    eta: '18 mins',
    address: '42 Park Ave, New York, NY',
    driver: 'Marcus Chen',
    driverPhone: '+1 (555) 234-5678',
    total: 35.99
  });
  const [toast, setToast] = useState('');

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const addToCart = (dish) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === dish.id);
      if (exists) {
        return prev.map(i => i.id === dish.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { id: dish.id, name: dish.name, price: dish.price, qty: 1, image: dish.image }];
    });
    showNotification(`Added "${dish.name}" to cart!`);
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : null;
      }
      return i;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = cart.length > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setOrderStage(1);
    setActiveOrder({
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      placedAt: 'Just Now',
      eta: '25 mins',
      address: '42 Park Ave, New York, NY',
      driver: 'David Miller',
      driverPhone: '+1 (555) 892-1244',
      total: total
    });
    setCart([]);
    setView('tracking');
    showNotification('Order placed successfully! Chef is preparing your dishes.');
  };

  const categories = ['All', 'Pizza', 'Pasta', 'Burgers', 'Ramen', 'Sushi', 'Sides'];
  const filteredDishes = categoryFilter === 'All'
    ? INITIAL_DISHES
    : INITIAL_DISHES.filter(d => d.category === categoryFilter);

  const STAGES = [
    { title: 'Order Confirmed', desc: 'Kitchen received your ticket' },
    { title: 'Chef Cooking', desc: 'Handcrafting gourmet dishes' },
    { title: 'Courier on the Way', desc: 'Hot insulated delivery' },
    { title: 'Delivered', desc: 'Enjoy your warm feast!' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('browse')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Utensils className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg text-white tracking-tight">TasteDash</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                  Live Platform
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Gourmet Food Ordering & Delivery</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setView('browse')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                view === 'browse' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Browse Menu
            </button>
            <button
              onClick={() => setView('tracking')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                view === 'tracking' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Live Tracker</span>
            </button>
            <button
              onClick={() => setView('kitchen')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                view === 'kitchen' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-purple-400/80 hover:text-purple-300'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen Console</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 transition"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cart.reduce((s, i) => s + i.qty, 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-amber-500/30">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: BROWSE DISHES & STOREFRONT */}
        {view === 'browse' && (
          <div className="space-y-8">
            {/* Hero Header */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/70 via-slate-900 to-orange-950/60 border border-amber-500/20 p-8 sm:p-12 shadow-2xl">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold mb-4 border border-amber-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>30-Minute Guaranteed Doorstep Delivery</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Handcrafted Meals From Manhattan's Finest Kitchens
                </h1>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Wood-fired artisanal pizzas, prime Angus smoked burgers, authentic Tokyo tonkotsu ramen, and delicate pastries.
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                    categoryFilter === c
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/30 transition duration-300 flex flex-col justify-between group shadow-xl"
                >
                  <div className="h-48 overflow-hidden relative bg-slate-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-400 border border-slate-700">
                      {dish.tag}
                    </span>
                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white font-mono border border-slate-700">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        {dish.category}
                      </span>
                      <button
                        onClick={() => addToCart(dish)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 active:scale-95 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE ORDER TRACKING */}
        {view === 'tracking' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold">Order ID: {activeOrder.id}</span>
                  <h2 className="text-xl font-black text-white mt-0.5">Live Delivery Fulfillment</h2>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated ETA</span>
                  <span className="text-base font-black text-amber-400 font-mono">{activeOrder.eta}</span>
                </div>
              </div>

              {/* 4-Stage Progress Stepper */}
              <div className="space-y-4">
                {STAGES.map((s, idx) => {
                  const isDone = idx < orderStage;
                  const isCurrent = idx === orderStage;
                  return (
                    <div key={s.title} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : isCurrent
                              ? 'bg-amber-500 text-slate-950 animate-pulse shadow-md shadow-amber-500/30'
                              : 'bg-slate-800 text-slate-500 border border-slate-700'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div className={`w-0.5 h-8 mt-1 ${isDone ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                        )}
                      </div>
                      <div className="pt-1 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold ${isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-slate-500'}`}>
                            {s.title}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Courier Dispatch Card */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{activeOrder.driver}</h4>
                    <p className="text-xs text-slate-400">Insulated Thermal Van Delivery</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  {activeOrder.driverPhone}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: KITCHEN ADMIN CONSOLE */}
        {view === 'kitchen' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                  <ChefHat className="w-6 h-6 text-purple-400" />
                  <span>Kitchen Line & Dispatch Operations</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">Live order fulfillment manager generated by CodeMind AI.</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-sm text-white">Active Order Dispatch Control</h3>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400">Advance Stage:</span>
                <button
                  onClick={() => { setOrderStage(1); showNotification('Stage: Chef Cooking'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${orderStage === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                >
                  Chef Cooking
                </button>
                <button
                  onClick={() => { setOrderStage(2); showNotification('Stage: Out for Delivery'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${orderStage === 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                >
                  Out for Delivery
                </button>
                <button
                  onClick={() => { setOrderStage(3); showNotification('Stage: Delivered'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${orderStage === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-Out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl z-10">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-white">Your Cart ({cart.reduce((s, i) => s + i.qty, 0)})</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl" />
                    <div className="flex-1 ml-3 mr-2">
                      <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-800 px-2 py-1 rounded-xl">
                      <button onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-800 bg-slate-950/40 space-y-3">
                <div className="flex justify-between text-xs text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs text-slate-400"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-amber-400 font-mono text-base">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Complete Your Food Order</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Delivery Address</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>42 Park Ave, Apt 5B, New York, NY</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Payment Method</label>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                  <CreditCard className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Card ending in 4242 (Instant Checkout)</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Payment</span>
                  <span className="text-lg font-black text-amber-400 font-mono">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md shadow-amber-500/20 transition active:scale-95"
                >
                  Place Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        TasteDash • Autonomous Food Ordering Application Generated by CodeMind AI
      </footer>
    </div>
  );
}

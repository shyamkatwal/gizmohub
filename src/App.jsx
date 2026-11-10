import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const testSupabase = async () => {
    const { data, error } = await supabase.auth.getSession();

    console.log(data.session);
    console.log(error);
    if (error) {
      console.error("Supabase connection error:", error.message);
      return;
    }

    console.log("Supabase connected successfully!");
    console.log("Current session:", data.session);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main className="p-8">
              <h1 className="mb-6 text-3xl font-bold">GizmoHub</h1>

              <div className="grid gap-4 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </main>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
export default function Wishlist() {
  const { ids } = useWishlist(),
    saved = products.filter((p) => ids.includes(p.id));
  return (
    <main className="mx-auto min-h-[55vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-600">
          <Heart fill="currentColor" />
        </span>
        <div>
          <h1 className="font-[Outfit] text-3xl font-extrabold">
            Your wishlist
          </h1>
          <p className="text-sm text-slate-500">{saved.length} saved gadgets</p>
        </div>
      </div>
      {saved.length ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-3xl bg-white py-16 text-center shadow-sm">
          <Heart className="mx-auto text-rose-300" size={38} />
          <h2 className="mt-4 font-[Outfit] text-2xl font-extrabold">
            Nothing saved just yet
          </h2>
          <p className="mt-2 text-slate-500">
            Tap the heart on a gadget to keep it here.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-violet-600 px-6 py-3 font-bold text-white"
          >
            Explore gadgets
          </Link>
        </div>
      )}
    </main>
  );
}

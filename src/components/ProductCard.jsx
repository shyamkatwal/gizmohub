import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductQuickView from "./ProductQuickView";

const money = (amount) => {
  if (typeof amount !== "number") {
    return "Price unavailable";
  }

  return `रू ${amount.toLocaleString("en-IN")}`;
};

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const liked = isWishlisted(product.id);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = () => {
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100/70">
        {/* Product Image */}
        <div
          className={`relative m-2 overflow-hidden rounded-[1.35rem] ${product.color}`}
        >
          <button
            type="button"
            onClick={openQuickView}
            className="block w-full"
            aria-label={`View ${product.name} details`}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-52 w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105 sm:h-60"
            />
          </button>

          {/* Product Badge */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold tracking-wider text-violet-700 shadow-sm">
            {product.badge}
          </span>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={liked}
            className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 text-slate-500 shadow-sm hover:text-rose-500"
          >
            <Heart size={17} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Product Information */}
        <div className="p-4 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
            {product.category}
          </p>

          {/* Product Name */}
          <button
            type="button"
            onClick={openQuickView}
            className="mt-1 block text-left font-[Outfit] text-lg font-bold text-slate-900 hover:text-violet-700"
          >
            {product.name}
          </button>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
            <Star size={14} fill="currentColor" />

            <span className="font-bold text-slate-700">{product.rating}</span>

            <span className="text-slate-400">(48 reviews)</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <div>
              <p className="font-[Outfit] text-lg font-extrabold">
                {money(product.price)}
              </p>

              <p className="text-xs text-slate-400 line-through">
                {money(product.oldPrice)}
              </p>
            </div>

            <button
              type="button"
              onClick={openQuickView}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      {/* Product Quick View Popup */}
      {isQuickViewOpen && (
        <ProductQuickView
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}

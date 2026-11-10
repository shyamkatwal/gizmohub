import { X, ShoppingCart, Star, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const money = (amount) => `रू ${amount.toLocaleString("en-IN")}`;

export default function ProductQuickView({ product, onClose }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 hover:bg-slate-200"
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        <div className="grid gap-7 md:grid-cols-2">
          {/* Product image */}
          <div className={`overflow-hidden rounded-2xl ${product.color}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              {product.category}
            </p>

            <h2 className="mt-2 font-[Outfit] text-2xl font-extrabold text-slate-900">
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-2 text-amber-500">
              <Star size={17} fill="currentColor" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-sm text-slate-400">Customer rating</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="font-[Outfit] text-2xl font-extrabold">
                {money(product.price)}
              </span>

              <span className="text-sm text-slate-400 line-through">
                {money(product.oldPrice)}
              </span>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-auto flex items-center gap-3 pt-8">
              <Link
              to={`/products/${product.id}`}
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-x1 border border-violet-600 px-3 py-4 text-center text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                <Eye size={18} />
                View Full Details
              </Link>

              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-4 font-bold text-white transition hover:bg-violet-700"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

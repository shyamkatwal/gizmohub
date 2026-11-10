import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, ShoppingBag, Star } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  if (!product)
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link className="mt-5 inline-block text-violet-700" to="/products">
          Back to shop
        </Link>
      </div>
    );
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-700"
      >
        <ArrowLeft size={17} /> Back to products
      </Link>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className={`overflow-hidden rounded-[2rem] ${product.color}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-cover mix-blend-multiply sm:h-[540px]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-violet-600">
            {product.category}
          </p>
          <h1 className="mt-3 font-[Outfit] text-4xl font-extrabold sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-amber-500">
            <Star fill="currentColor" size={17} />
            <b className="text-slate-800">{product.rating}</b>
            <span className="text-sm text-slate-400">Customer rating</span>
          </div>
          <p className="mt-6 text-3xl font-extrabold">
            रू {product.price.toLocaleString("en-IN")}
          </p>
          <p className="mt-1 text-slate-400 line-through">
            रू {product.oldPrice.toLocaleString("en-IN")}
          </p>
          <p className="mt-6 max-w-lg leading-7 text-slate-600">
            {product.description}
          </p>
          <div className="mt-7 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Check size={17} className="text-green-600" /> Quality checked
              product
            </p>
            <p className="flex items-center gap-2">
              <Check size={17} className="text-green-600" /> Delivery available
              across Nepal
            </p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="mt-9 inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-violet-600 px-7 py-4 font-extrabold text-white shadow-lg shadow-violet-200 hover:bg-violet-700"
          >
            <ShoppingBag size={19} /> Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}

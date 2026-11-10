import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, X, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-violet-700 ${isActive ? "text-violet-700" : "text-slate-600"}`;
  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
            <Zap size={22} fill="currentColor" />
          </span>
          <span className="font-[Outfit] text-2xl font-extrabold tracking-tight">
            Gizmo<span className="text-orange-500">Hub.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Shop
          </NavLink>
          <a
            href="/#categories"
            className="text-sm font-semibold text-slate-600 hover:text-violet-700"
          >
            Categories
          </a>
          <a
            href="/#deals"
            className="text-sm font-semibold text-slate-600 hover:text-violet-700"
          >
            Deals
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/products"
            aria-label="Search products"
            className="hidden rounded-full p-3 text-slate-600 hover:bg-violet-50 sm:block"
          >
            <Search size={19} />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-3 text-rose-500 hover:bg-rose-50"
          >
            <Heart size={20} />
            {ids.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full bg-violet-50 p-3 text-violet-700 hover:bg-violet-100"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-3 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-violet-100 bg-white px-6 py-5 md:hidden">
          <Link onClick={() => setMenuOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/products">
            Shop all
          </Link>
          <Link onClick={() => setMenuOpen(false)} to="/wishlist">
            Wishlist
          </Link>
          <a onClick={() => setMenuOpen(false)} href="/#categories">
            Categories
          </a>
          <a onClick={() => setMenuOpen(false)} href="/#deals">
            Deals
          </a>
        </nav>
      )}
    </header>
  );
}

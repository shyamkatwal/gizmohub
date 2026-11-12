import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  Zap,
  User,
  LogOut,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition hover:text-violet-700 ${
      isActive ? "text-violet-700" : "text-slate-600"
    }`;

  // Get logged-in user and listen for authentication changes
  useEffect(() => {
    let mounted = true;

    const loadProfile = async (currentUser) => {
      if (!currentUser) {
        if (mounted) {
          setProfile(null);
        }
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (mounted) {
        setProfile(data || null);
      }
    };

    const initializeAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (mounted) {
        setUser(data.user || null);
        await loadProfile(data.user);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      const currentUser = session?.user || null;
      setUser(currentUser);

      // Clear profile immediately on logout.
      if (!currentUser) {
        setProfile(null);
      } else {
        // Defer the profile query until after the auth callback.
        setTimeout(() => {
          if (mounted) loadProfile(currentUser);
        }, 0);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Logout customer
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    setLoggingOut(false);

    if (error) {
      alert(error.message);
      return;
    }

    setMenuOpen(false);
    navigate("/login");
  };

  const customerName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "My Account";

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
            <Zap size={22} fill="currentColor" />
          </span>
          <span className="font-[Outfit] text-2xl font-extrabold tracking-tight">
            Gizmo<span className="text-orange-500">Hub.</span>
          </span>
        </Link>

        {/* Desktop navigation */}
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

        {/* Right side actions */}
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

          {/* Desktop account section */}
          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/account"
                className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2 text-violet-800 hover:bg-violet-100"
              >
                <User size={18} />
                <span className="max-w-28 truncate text-sm font-bold">
                  {customerName}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Logout"
                className="rounded-full p-3 text-slate-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <LogOut size={19} />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="text-sm font-bold text-violet-700 hover:text-violet-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-3 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-violet-100 bg-white px-6 py-5 md:hidden">
          <Link onClick={() => setMenuOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/products">
            Shop all
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/wishlist">
            Wishlist ({ids.length})
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/cart">
            Shopping Cart ({count})
          </Link>

          <a onClick={() => setMenuOpen(false)} href="/#categories">
            Categories
          </a>

          <a onClick={() => setMenuOpen(false)} href="/#deals">
            Deals
          </a>

          <div className="border-t border-violet-100 pt-4">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User size={19} className="text-violet-700" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {customerName}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  to="/account"
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-semibold text-violet-700"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex items-center gap-2 text-sm font-bold text-red-600 disabled:opacity-50"
                >
                  <LogOut size={18} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="font-bold text-violet-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="font-bold text-violet-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

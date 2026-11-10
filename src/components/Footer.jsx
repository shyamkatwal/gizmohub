import { Link } from "react-router-dom";
import { Zap, Camera, Users, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#17152b] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold"
          >
            <Zap className="text-orange-400" fill="currentColor" />
            Gizmo<span className="text-orange-400">Hub.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Little upgrades. Big joy. Discover gadgets that make every day
            better.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/products" className="hover:text-white">
              All products
            </Link>
            <a href="/#categories" className="hover:text-white">
              Categories
            </a>
            <a href="/#deals" className="hover:text-white">
              Special offers
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Stay in the loop</h3>
          <p className="mt-3 text-sm text-slate-400">
            Fresh finds, cool tech and exclusive offers.
          </p>

          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-xl bg-white/10 p-3 hover:bg-violet-600"
            >
              <Camera size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-xl bg-white/10 p-3 hover:bg-violet-600"
            >
              <Users size={18} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="rounded-xl bg-white/10 p-3 hover:bg-violet-600"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} GizmoHub. All rights reserved.
      </div>
    </footer>
  );
}

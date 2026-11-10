import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  // Get all unique product categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Search, filter and sort products
  const filtered = useMemo(() => {
    let result = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase()),
    );

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [query, category, sort]);

  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="rounded-[2rem] bg-gradient-to-r from-violet-700 to-indigo-600 px-7 py-10 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-200">
          The good stuff
        </p>

        <h1 className="mt-2 font-[Outfit] text-4xl font-extrabold sm:text-5xl">
          All the gadgets.
        </h1>

        <p className="mt-3 text-violet-100">Find your next favourite thing.</p>
      </div>

      {/* Search, Categories and Sorting */}
      <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={19}
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gadgets..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal size={17} className="text-slate-400" />

          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                category === c
                  ? "bg-violet-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-violet-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-violet-400"
        >
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="mb-5 mt-8 text-sm text-slate-500">
        {filtered.length} products found
      </p>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl bg-white py-20 text-center">
          <p className="text-lg font-bold">No gadgets found</p>

          <p className="mt-2 text-sm text-slate-500">
            Try another search or category.
          </p>

          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-full bg-violet-600 px-5 py-3 font-bold text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}

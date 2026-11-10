import { ArrowRight, ArrowUpRight, Headphones, Watch, Speaker, Gamepad2, Truck, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const categories = [
  { name: 'Audio', sub: 'Find your sound', icon: Headphones, color: 'bg-purple-100 text-purple-700' },
  { name: 'Wearables', sub: 'Tech that moves', icon: Watch, color: 'bg-blue-100 text-blue-700' },
  { name: 'Speakers', sub: 'Turn it up', icon: Speaker, color: 'bg-orange-100 text-orange-700' },
  { name: 'Gaming', sub: 'Level up', icon: Gamepad2, color: 'bg-pink-100 text-pink-700' },
]
export default function Home() {
  return <main>
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#21164d] px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
        <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/40 blur-3xl"/>
        <div className="absolute bottom-0 right-1/3 -z-10 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl"/>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold tracking-widest text-violet-200"><Sparkles size={14}/> THE FUTURE LOOKS FUN</span>
            <h1 className="mt-6 font-[Outfit] text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">Upgrade your<br/>everyday <span className="text-orange-400">game.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-violet-100/80">Discover clever tech, feel-good gadgets and the little things that make life more awesome.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-7 py-4 font-extrabold text-[#24164b] shadow-lg shadow-orange-950/20 hover:-translate-y-0.5 hover:bg-orange-300">Shop the collection <ArrowRight size={18}/></Link><a href="#categories" className="rounded-full border border-white/30 px-7 py-4 font-bold hover:bg-white/10">Explore categories</a></div>
            <div className="mt-10 flex items-center gap-5 text-xs text-violet-100/70"><span><b className="text-white">500+</b> cool gadgets</span><span className="h-4 w-px bg-white/20"/><span><b className="text-white">4.9/5</b> happy shoppers</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-4 rotate-6 rounded-[2rem] bg-orange-400"/>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-200 via-purple-100 to-orange-100 p-4 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000" alt="Premium headphones" className="h-72 w-full rounded-[1.5rem] object-cover sm:h-96"/>
              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/90 px-5 py-3 text-slate-900 shadow-xl backdrop-blur"><p className="text-xs font-bold uppercase tracking-widest text-violet-600">Featured pick</p><p className="font-[Outfit] text-xl font-extrabold">Sound without limits.</p></div>
              <span className="absolute right-8 top-8 grid h-16 w-16 rotate-12 place-items-center rounded-full bg-orange-400 text-center text-xs font-black leading-tight text-violet-950">HOT<br/>DEAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="categories" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-violet-600">Find your thing</p><h2 className="mt-2 font-[Outfit] text-3xl font-extrabold sm:text-4xl">Shop by category</h2></div><Link to="/products" className="hidden items-center gap-1 text-sm font-bold text-violet-700 sm:flex">All products <ArrowUpRight size={17}/></Link></div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{categories.map(({name,sub,icon:Icon,color})=><Link key={name} to="/products" className="group flex items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-5"><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${color}`}><Icon size={23}/></span><span><b className="block font-[Outfit] text-base">{name}</b><span className="text-xs text-slate-400">{sub}</span></span><ArrowUpRight className="ml-auto text-slate-300 transition group-hover:text-violet-600" size={17}/></Link>)}</div>
    </section>
    <section id="deals" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-orange-500">Handpicked for you</p><h2 className="mt-2 font-[Outfit] text-3xl font-extrabold sm:text-4xl">Trending right now</h2><p className="mt-2 text-sm text-slate-500">The gadgets everyone's talking about.</p></div><Link to="/products" className="hidden items-center gap-1 text-sm font-bold text-violet-700 sm:flex">View all <ArrowRight size={17}/></Link></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,4).map(product=><ProductCard key={product.id} product={product}/>)}</div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="grid gap-4 rounded-[2rem] bg-violet-100 p-6 sm:grid-cols-3 sm:p-9">{[{icon:Truck,title:'Fast delivery',desc:'Quick delivery across Nepal'},{icon:ShieldCheck,title:'Shop with confidence',desc:'Quality picks, every time'},{icon:RefreshCw,title:'Easy returns',desc:'Hassle-free support'}].map(({icon:Icon,title,desc})=><div key={title} className="flex items-center gap-4 p-2"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-violet-700"><Icon size={22}/></span><span><b className="block font-[Outfit]">{title}</b><span className="text-sm text-slate-500">{desc}</span></span></div>)}</div></section>
  </main>
}

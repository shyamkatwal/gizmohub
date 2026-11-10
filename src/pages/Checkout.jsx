import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CheckCircle2, LockKeyhole } from 'lucide-react'
import { useCart } from '../context/CartContext'
const money=n=>`रू ${n.toLocaleString('en-IN')}`
export default function Checkout(){
 const {items,total,clearCart}=useCart()
 const [done,setDone]=useState(false)
 const [form,setForm]=useState({name:'',email:'',phone:'',city:'Kathmandu',address:'',payment:'cod'})
 const [errors,setErrors]=useState({})
 const delivery=total>=5000?0:150
 const update=e=>setForm({...form,[e.target.name]:e.target.value})
 if(!items.length&&!done)return <Navigate to="/cart" replace/>
 const submit=e=>{
  e.preventDefault(); const err={}
  if(!form.name.trim())err.name='Enter your name.'
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))err.email='Enter a valid email.'
  if(!/^[0-9+\-\s]{7,15}$/.test(form.phone))err.phone='Enter a valid phone number.'
  if(!form.address.trim())err.address='Enter your delivery address.'
  if(!form.city.trim())err.city='Enter your city.'
  setErrors(err); if(Object.keys(err).length)return
  setDone(true);clearCart()
 }
 if(done)return <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16"><div className="w-full rounded-[2rem] bg-white p-8 text-center shadow-sm sm:p-12"><CheckCircle2 className="mx-auto text-green-500" size={54}/><p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-green-600">Demo order created</p><h1 className="mt-2 font-[Outfit] text-3xl font-extrabold">Thanks, {form.name.split(' ')[0]}!</h1><p className="mt-3 text-slate-500">Your checkout flow works. This is a frontend demo: no payment was taken and no order was sent to a server.</p><p className="mt-5 rounded-xl bg-violet-50 p-4 text-sm">{form.address}, {form.city} · {form.payment==='cod'?'Cash on delivery':'Bank transfer demo'}</p><Link to="/products" className="mt-6 inline-flex rounded-full bg-violet-600 px-7 py-3 font-bold text-white">Continue shopping</Link></div></main>
 const field=(label,name,placeholder,type='text')=><label className="block"><span className="mb-2 block text-sm font-bold">{label}</span><input name={name} type={type} value={form[name]} onChange={update} placeholder={placeholder} className={`w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 ${errors[name]?'border-rose-400':'border-slate-200'}`}/>{errors[name]&&<small className="text-rose-500">{errors[name]}</small>}</label>
 return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><h1 className="font-[Outfit] text-4xl font-extrabold">Checkout</h1><p className="mt-2 text-sm text-slate-500">Enter your delivery details to preview the order flow.</p><form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
 <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"><h2 className="font-[Outfit] text-xl font-extrabold">Delivery information</h2><div className="mt-6 grid gap-5 sm:grid-cols-2">{field('Full name','name','Your name')}{field('Email address','email','you@example.com','email')}{field('Phone number','phone','98XXXXXXXX')}{field('City','city','Kathmandu')}</div><div className="mt-5">{field('Delivery address','address','Street, area, landmark')}</div><h2 className="mt-9 font-[Outfit] text-xl font-extrabold">Payment method</h2><div className="mt-4 grid gap-3 sm:grid-cols-2"><label className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4"><input type="radio" name="payment" value="cod" checked={form.payment==='cod'} onChange={update}/> <span className="text-sm font-bold">Cash on delivery</span></label><label className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4"><input type="radio" name="payment" value="bank" checked={form.payment==='bank'} onChange={update}/> <span className="text-sm font-bold">Bank transfer (demo)</span></label></div></section>
 <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"><h2 className="font-[Outfit] text-xl font-extrabold">Your order</h2><div className="mt-5 space-y-4">{items.map(i=><div key={i.id} className="flex items-center gap-3"><img src={i.image} alt="" className="h-14 w-14 rounded-xl object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{i.name}</p><p className="text-xs text-slate-400">Qty: {i.quantity}</p></div><b className="text-sm">{money(i.price*i.quantity)}</b></div>)}</div><div className="mt-5 space-y-3 border-t border-dashed pt-5 text-sm"><div className="flex justify-between"><span>Subtotal</span><b>{money(total)}</b></div><div className="flex justify-between"><span>Delivery</span><b>{delivery?money(delivery):'FREE'}</b></div><div className="flex justify-between border-t pt-4 text-base font-extrabold"><span>Total</span><span>{money(total+delivery)}</span></div></div><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-orange-400 px-6 py-4 font-extrabold text-violet-950 hover:bg-orange-300"><LockKeyhole size={17}/> Place demo order</button><p className="mt-3 text-center text-xs text-slate-400">No payment is processed.</p></aside>
 </form></main>
}

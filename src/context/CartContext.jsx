import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('gizmohub-cart') || '[]') } catch { return [] } })
  useEffect(() => localStorage.setItem('gizmohub-cart', JSON.stringify(items)), [items])
  const addToCart = product => setItems(current => {
    const found = current.find(item => item.id === product.id)
    return found ? current.map(item => item.id === product.id ? {...item, quantity:item.quantity+1} : item) : [...current,{...product,quantity:1}]
  })
  const updateQuantity = (id, quantity) => setItems(current => quantity <= 0 ? current.filter(x=>x.id!==id) : current.map(x=>x.id===id?{...x,quantity}:x))
  const removeFromCart = id => setItems(current=>current.filter(x=>x.id!==id))
  const clearCart = () => setItems([])
  const count = items.reduce((s,x)=>s+x.quantity,0), total = items.reduce((s,x)=>s+x.price*x.quantity,0)
  const value = useMemo(()=>({items,addToCart,updateQuantity,removeFromCart,clearCart,count,total}),[items,count,total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

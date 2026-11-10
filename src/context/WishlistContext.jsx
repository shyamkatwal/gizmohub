import { createContext, useContext, useEffect, useMemo, useState } from 'react'
const WishlistContext = createContext(null)
export const useWishlist = () => useContext(WishlistContext)
export function WishlistProvider({children}) {
  const [ids,setIds] = useState(()=>{try{return JSON.parse(localStorage.getItem('gizmohub-wishlist')||'[]')}catch{return []}})
  useEffect(()=>localStorage.setItem('gizmohub-wishlist',JSON.stringify(ids)),[ids])
  const toggleWishlist=id=>setIds(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id])
  const isWishlisted=id=>ids.includes(id)
  const value=useMemo(()=>({ids,toggleWishlist,isWishlisted}),[ids])
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

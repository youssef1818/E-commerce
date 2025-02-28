import axios from 'axios'
import React, { createContext, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

export const CartContext = createContext()
export default function CartContextProvider({ children }) {
    
    
    const [numCart, setNumCart] = useState()
    const [userId, setUserId] = useState()
    
    const [WishItems, setWishItems] = useState()
    const [TotalPrice, setTotalPrice] = useState()
    const [allCartItems, setAllCartItems] = useState([])
    const [checkedWish, setcheckedWish] = useState([])
    const [cartId, setCartId] = useState([])

    async function addToCart(productId) {
        try {
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
                headers: {
                    token: localStorage.getItem('token'),
                }
            })

            console.log(res)
            if (res.data.status == 'success') {
                toast.success('Product added successfuly')
            }
            setNumCart(res.data.numOfCartItems)
        }
        catch (err) {
            toast.error('Failed to add')
        }
    }
    async function getCartItem() {
        try {
            const cartItem = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: { token: localStorage.getItem('token') } })
            
            setAllCartItems(cartItem.data.data.products);
            setTotalPrice(cartItem.data.data.totalCartPrice)
            setNumCart(cartItem.data.numOfCartItems)
            setCartId(cartItem.data.cartId)
            const decoded=jwtDecode(localStorage.getItem('token'))
            setUserId(decoded.id)


        }
        catch (err) {
            console.log(err)
        }
    }
    async function updateCartItem(id, count) {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // console.log(response)
            setAllCartItems(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)
        }
        catch (err) {
            console.log(err, 'errrr')
        }
    }
    async function deleteProduct(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token: localStorage.getItem('token') } })
        console.log(res)
        setAllCartItems(res.data.data.products)
        setNumCart(res.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)



    }
    async function addToWishlsit(productId) {
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers: { token: localStorage.getItem('token') } })
        console.log(res);
        toast.success('Successfully added to wishlist')

    }
    async function getWishlist() {
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers: { token: localStorage.getItem('token') } })
        console.log(res);
        setWishItems(res.data.data)
        const tempArr = []
        res.data.data.map((item) => tempArr.push(item.id))
        setcheckedWish(tempArr);
        console.log(checkedWish)
    }
    async function deleteWish(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token: localStorage.getItem('token') } })
        console.log(res);
        setWishItems(res.data.data)
    }


    return <>
        <CartContext.Provider value={{ addToCart, numCart, getCartItem, allCartItems, updateCartItem, TotalPrice, deleteProduct, addToWishlsit, getWishlist, WishItems, deleteWish, checkedWish,cartId,setNumCart,userId }}>
            {children}
        </CartContext.Provider>

    </>
}

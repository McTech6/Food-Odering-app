import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context with an initial value of null
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const setAuthToken = (newToken) => {
    setToken(newToken);

    localStorage.setItem("token", newToken);
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      console.log("Full response:", response); // Check entire response object
      setFoodList(response.data.foods || []); // Adjust based on the actual structure
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]); // Set an empty array to prevent issues if the request fails
    }
  };
  const LoadCartData = async (token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }
  
  

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
       await LoadCartData(localStorage.getItem("token"))
    }
    loadData();
  }, []);

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

 

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const contextValue = {
    // Add any state or functions you want to provide here
    food_list,
    addToCart,
    removeFromCart,
    setCartItems,
    cartItems,
    getTotalCartAmount,
    url,
    token,
    setAuthToken,
    fetchFoodList
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

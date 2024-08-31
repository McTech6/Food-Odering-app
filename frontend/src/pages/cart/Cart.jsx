import React, { useContext } from "react";
import './cart.css';
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const navigate =useNavigate()

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross"
                  onClick={()=>removeFromCart(item._id)}
                  >X</p>
                </div>
                <hr />

              </div>
            );
          }
          return null; // Return null if the condition is not met
        })}
      
      <div className="cart-buttom">
        <div className="cart-total">
         <h2>Car Total</h2>
         <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
         </div>
         <hr />
         <div className="cart-total-details">
           <p>Delivery Fee</p>
           <p>${getTotalCartAmount()===0? 0:2}</p>
         </div>
         <hr />
         <div className="cart-total-details">
           <b>Total</b><b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
         </div>
         <button onClick={()=>navigate('/order')} className="buttonn">PROCEED TO CHECKOUT</button>
        
        </div>
        <div className="cart-promo-code">
        <p>If you have a promo code enter it here</p>
        <div className="cart-promo-code-input">
          <input type="text" placeholder="Promo Code" />
          <button>Submit</button>
        </div>
      </div>
       
        
      </div>
      
      </div>
     
    </div>
  );
};

export default Cart;

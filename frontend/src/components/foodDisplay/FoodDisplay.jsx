import React, { useContext, useEffect } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  console.log(food_list);



  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list &&
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              // Your code here
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;

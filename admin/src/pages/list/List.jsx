import { useEffect, useState } from 'react';
import './list.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.foods || []);
      } else {
        toast.error("Error");
        console.log("This is just some errors I want to use it to debug");
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      toast.error("Failed to fetch data");
    }
  };


  const removeFood = async (id)=>{
        const response =await axios.delete(`${url}/api/food/remove`, {data: {id:id}})
        await fetchList()
        if(response.data.success){
          toast.success(response.data.msg)
        }
        else{
          toast.error("Could not delete food")
        }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
};

export default List;

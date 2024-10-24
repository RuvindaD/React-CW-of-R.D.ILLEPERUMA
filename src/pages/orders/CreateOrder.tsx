import { useEffect, useState } from "react";
import ItemType from "../../types/ItemType";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateOrder(){

    const[items,setItems]=useState<ItemType[]>([]);

    async function loadItems() {
        try {
            const response=await axios.get("http://localhost:8082/items");
            setItems(response.data);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect(()=>{
        loadItems();
    },[])
const[orderedItems,setOrderedItems]=useState<ItemType[]>([]);
const[total,SetTotal]=useState<number>(0);

function addItemToOrder(item:ItemType){
    const updateOrder=[...orderedItems,item]//spreading ordered Items array and assign a new value
    setOrderedItems(updateOrder);
}

useEffect(function(){
    orderedItems.map(function (item){
        const totalPrice=total+item.price;
        SetTotal(totalPrice);
    });

},[orderedItems]);

const navigate=useNavigate();//usethis from react router dom to navigate user

async function saveOrder() {
    try {
    const itemIds:any=[];
    
    orderedItems.map(function(item){
        itemIds.push(item.id);
    });

   
        await axios.post("http://localhost:8082/orders",{
            itemIds:itemIds
        });

        navigate("/orders");//navigate user if successful
       
    } catch (error) {
        console.log(error)
    }
    
}

  

return(
    <div className="flex">
        <div className="w-[400px] border border-slate-100 p-2">
            <div className="text-xl font-semibold text slate-800">Items</div>
            
            <div className="mt-5">
                {items.map(function(item){
                    return(
                        <div onClick={()=>addItemToOrder(item)} className="border border-slate-200 rounded-lg p-2 mb-2">
                            <div className="text-lg font-semibold">{item.name}</div>
                            <div className="text-sm text-slate-400">{item.category.name}</div>
                            <div className="text-sm text-green-600 text-right">Rs.{item.price}</div>

                        </div>
                    )
                })}
                </div>
          </div>

        <div className=" p-2 w-full">
            <span className="text-xl font-semibold text slate-800">New Order</span>
            <table className="w-full border-seperate border-spacing-0 border-none text-left">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th >Price</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {orderedItems.map(function(item){
                        return(
                            <tr>
                               <td className="w-[80px]"> {item.id}</td>
                               <td className="w-[200px]"> {item.name}</td>
                               <td className="w-[200px]"> {item.price}</td> 
                            </tr>
                        )
                    })}
                     <tr>
                        <td colSpan={2}>
                            <strong>Total</strong>
                        </td>

                        <td className="border border-slate-500">
                        <strong>{total}</strong>

                        </td>
                    </tr>
                </tbody>

            </table>

            <div className="mt-5"><button type="button" className="py-3 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={saveOrder}>Save Order</button>

        </div>


    </div>
 </div>


)

}
export default CreateOrder;
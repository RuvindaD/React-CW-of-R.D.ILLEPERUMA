/* import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { StockType } from "../types/StockType";

function Stock(){
    
    const{isAuthenticated,jwtToken}=useAuth();
    
    const[stocks,setStocks]=useState<StockType[]>([]);
    
    const[itemId, setItemId]=useState<number>();
    const[stockQuantity,setStockQuantity]=useState<number>(0.0);

    const[items, setItems]=useState<ItemType[]>([]);

    
    const config={
        headers:{
            Autherization:`Bearer ${jwtToken}`
        }
    }

    async function loadStocks() {
        const response=await axios.get("http://localhost:8082/stocks",config)
        setStocks(response.data);
        
    }

    async function loadItems() {
  
        const response=await axios.get("http://localhost:8082/items",config)  
          setItems(response.data);
       // console.log(response);
      }
  


    useEffect(function(){
        if(isAuthenticated)
        loadStocks();
        loadItems();
    },[isAuthenticated])

    

    function handleItemId(e:any) {
     setItemId(e.target.value);
    }

    function handleStockQuantity(e:any) {
        setStockQuantity(e.target.value);
       }
    
       

       async function handleSubmit() {
        const data={
         itemId: itemId,
        stockQuantity:stockQuantity
         
        }
        try {
            await axios.post("http://localhost:8082/stocks",data,config); 
            loadStocks();
            setItemId(0);
            setStockQuantity(0);
        } catch (error:any) {
            console.log(error);
        }
    }
        
        const[stockEditing,setStockEditing]=useState<ItemType|null>(null);

        function editStock (item:ItemType) {
            setStockEditing(item);
            setItemId(stock.item.id);
            setStockQuantity(stock.stockQuantity);
                
       
      }

      async function updateItem() {
        const data={
            stockId:stockId
            stockquantity:stockquantity,
           
        }
        try {
            await axios.put(`http://localhost:8082/stocks/${stockEditing?.id}`,data,config);
           
            setStockEditing(null);
            loadStocks();
            setItemId(0);
            setStockQuantity(0);
       

        } catch (error) {
            console.log(error);  
                
      }
    }

    async function deleteStock(stockId:number){
        try {
            await axios.delete(`http://localhost:8082/stocks/${stockId}`);
            loadStocks();
        } catch (error) {
           console.log(error); 
        }

       }



    return(
        <div>
            <div className="container mx-auto py-5 pb-5">
            <h1 className="text-3xl font-semibold">Stocks</h1>
                
                <table className="w-full border-seperate border-spacing-0 border-none text-left">
                    <thead className="bg-slate-300">
                    <tr>
                        <th className="w-[80px] text-start">Stock ID</th>
                        <th className="w-[200px]">Item Id</th>
                        <th className="w-[200px]">Stock Quantity</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>   
                    </thead>
                    <tbody>
                    {stocks.map(function(stock){
            return(
                <tr>
                    <td>{stock.id}</td>
                    <td>{stock.stockQuantity}</td>
                    <td>
                        <button onClick={()=>editStock(stock)} className="bg-slate-400 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-200">Edit</button>
                        <button onClick={()=>deleteStock(stock.id)} className="bg-red-400 text-white-400 px-2 py-1 rounded-lg hover:bg-slate-200">Delete</button>
                    </td>

                </tr>

               
            )
         } ) }
                        
                    </tbody>
                  

                </table>
                <div className="border border-slate-300 px-5 py-5 rounded-lg max-w-[350px]">
        <form>
            
            <div>
            <label className="text-slate-600 font-sm block mb-3">Stock Quantity</label>
            <input type="text" className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={stockQuantity} onChange={handleStockQuantity} required/>
            </div>
            

            <div>
            <label className="text-slate-600 font-sm block mb-3">Item Id</label>
            <select className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={itemId} onChange={handleItemId} required>
            <option value= ""> Please select a category</option>
            {items.map(function(item){
                return(
                    <option value={item.id}> {item.name}
                    </option>
                )
            }
            )

            }
            </select>
            </div>

            {stockEditing ? (
                <>
                <button type="button" className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={updateStock}>Update Stock</button>
                </>
            ):(
                <>
                <button type="button" className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Stock</button>
                
                </>
            )           
            }
             
        </form>
        </div>
                

            </div>

           
        </div>
    )
}


export default Stock; */
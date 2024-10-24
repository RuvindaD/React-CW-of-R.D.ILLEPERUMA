import { useEffect, useState } from "react";
import ItemType from "../types/ItemType";
import axios from "axios";
import CategoryType from "../types/CategoryType";
import { useAuth } from "../Context/AuthContext";

function Item(){
    
    const{isAuthenticated,jwtToken}=useAuth();
    
    const[items,setItems]=useState<ItemType[]>([]);
    
    const[itemName, setItemName]=useState<string>("");
    const[description, setDescription]=useState<string>("");
    const[quantity, setQuantity]=useState<number>(0.0);
    const[price, setPrice]=useState<number>(0.0);
    const[categoryId,setCategoryId]=useState<number>();

    const[categories, setCategories]=useState<CategoryType[]>([]);

    
    const config={
        headers:{
            Autherization:`Bearer ${jwtToken}`
        }
    }

    async function loadItems() {
        const response=await axios.get("http://localhost:8082/items",config)
        setItems(response.data);
        
    }

    async function loadCategories() {
  
        const response=await axios.get("http://localhost:8082/categories",config)  
          setCategories(response.data);
       // console.log(response);
      }
  


    useEffect(function(){
        if(isAuthenticated)
        loadItems();
        loadCategories();
    },[isAuthenticated])

    

    function handleItemName(e:any) {
     setItemName(e.target.value);
    }

    function handleDescription(e:any) {
        setDescription(e.target.value);
       }
    
       function handleQuantity(e:any) {
        setQuantity(e.target.value);
       }

       function handlePrice(e:any) {
        setPrice(e.target.value);
       }

       function handleCategoryId(e:any) {
        setCategoryId(e.target.value);
       }

       async function handleSubmit() {
        const data={
          name:itemName,
          description:description,
          quantity:quantity,
          price:price,
          categoryId:categoryId
        }
        try {
            await axios.post("http://localhost:8082/items",data,config); 
            loadItems();
            setItemName("");
            setDescription("");
            setQuantity(0);
            setPrice(0);
            setCategoryId(0);
        } catch (error:any) {
            console.log(error);
        }
    }
        
        const[itemEditing,setItemEditing]=useState<ItemType|null>(null);

        function editItem (item:ItemType) {
            setItemEditing(item);
            setItemName(item.name);
            setDescription(item.description);
            setQuantity(item.quantity);
            setPrice(item.price);
            setCategoryId(item.category?.id);     
       
      }

      async function updateItem() {
        const data={
            name:itemName,
            description:description,
            quantity:quantity,
            price:price,
            categoryId:categoryId
        }
        try {
            await axios.put(`http://localhost:8082/items/${itemEditing?.id}`,data,config);
           
            setItemEditing(null);
            loadItems();
            setItemName("");
            setDescription("");
            setQuantity(0);
            setPrice(0);
            setCategoryId(0);
       

        } catch (error) {
            console.log(error);  
                
      }
    }

    async function deleteItem(itemId:number){
        try {
            await axios.delete(`http://localhost:8082/items/${itemId}`);
            loadItems();
        } catch (error) {
           console.log(error); 
        }

       }



    return(
        <div>
            <div className="container mx-auto py-5 pb-5">
            <h1 className="text-3xl font-semibold">Items</h1>
                
                <table className="w-full border-seperate border-spacing-0 border-none text-left">
                    <thead className="bg-slate-300">
                    <tr>
                        <th className="w-[80px] text-start">Item ID</th>
                        <th className="w-[200px]">Item Name</th>
                        <th className="w-[200px]">Item Quantity</th>
                        <th className="w-[200px]">Item Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>   
                    </thead>
                    <tbody>
                    {items.map(function(item){
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                        <button onClick={()=>editItem(item)} className="bg-slate-400 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-200">Edit</button>
                        <button onClick={()=>deleteItem(item.id)} className="bg-red-400 text-white-400 px-2 py-1 rounded-lg hover:bg-slate-200">Delete</button>
                    </td>

                </tr>

               
            )
         } ) }
                        
                    </tbody>
                  

                </table>
                <div className="border border-slate-300 px-5 py-5 rounded-lg max-w-[350px]">
        <form>
            <div>
            <label className="text-slate-600 font-sm block mb-3">Item Name</label>
            <input type="text" className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={itemName} onChange={handleItemName} required/>
            </div>

            <div>
            <label className="text-slate-600 font-sm block mb-3">Description</label>
            <input type="text" className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={description} onChange={handleDescription} required/>
            </div>

            <div>
            <label className="text-slate-600 font-sm block mb-3">Quantity</label>
            <input type="text" className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={quantity} onChange={handleQuantity} required/>
            </div>
            
            <div>
            <label className="text-slate-600 font-sm block mb-3">Price</label>
            <input type="text" className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={price} onChange={handlePrice} required/>
            </div>

            <div>
            <label className="text-slate-600 font-sm block mb-3">Category</label>
            <select className="text-slate-600 font-sm block mb-3 w-full py-2 border border-slate-400 rounded-lg" value={categoryId} onChange={handleCategoryId} required>
            <option value= ""> Please select a category</option>
            {categories.map(function(category){
                return(
                    <option value={category.id}> {category.name}
                    </option>
                )
            }
            )

            }
            </select>
            </div>

            {itemEditing ? (
                <>
                <button type="button" className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={updateItem}>Update Item</button>
                </>
            ):(
                <>
                <button type="button" className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-950 mb-2 text-sm" onClick={handleSubmit}>Create Item</button>
                
                </>
            )           
            }
             
        </form>
        </div>
                

            </div>

           
        </div>
    )
}


export default Item;
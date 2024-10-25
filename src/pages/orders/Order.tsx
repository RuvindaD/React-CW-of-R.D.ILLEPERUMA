import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";


function Orders(){

    const{isAuthenticated,jwtToken}=useAuth();

    const[orders,setOrders]=useState<OrderType[]>([]);

    const config={
        headers:{
            Autherization:`Bearer ${jwtToken}`
        }
    }

    async function loadOrders() {
        try {
            const response= await axios.get("http://localhost:8082/orders",config);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect (function(){
        if(isAuthenticated){
        loadOrders();
        }
    },[isAuthenticated])

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5">Orders</h1>
            
            <Link to="/order/create" className="text-blue-500 mb-5">Add Order</Link>
            
            <table className="w-full border-seperate border-spacing-0 border-none text-left">
                    <thead className="bg-slate-300">
                       
                    <tr>
                        <th className="w-[80px] text-start">Order ID</th>
                        <th className="w-[200px]">Order Date and Time</th>
                        <th className="w-[200px]"> Total Price</th>
                        <th className="w-[200px]">Actions</th>
                    </tr>   
                    </thead>
                    <tbody>
                        {orders.map(function(order){
                            return(
                                <tr>
                                    <td>{order.id}</td>
                                    {/* <td>{order.orderDateTime}</td> */}
                                    <td>{order.totalPrice}</td>
                                    <td></td>
                                </tr>
                            )
                         }  ) }
                    </tbody>
                    </table>
                   
        </div>
    )






}
export default Orders;
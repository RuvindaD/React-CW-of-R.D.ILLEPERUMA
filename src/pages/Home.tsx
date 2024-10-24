import { useState } from "react";
import Vehicle from "../components/Vehicle";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Home(){
  const [count, setCount] = useState(0)

    //react hooks
  
    const [username,setUsername]=useState<string>("");

    const{logout}=useAuth()
  
    function handleInputChange(event:any) {
      setUsername(event.target.value);
    }
  
    function increaseCount(){
      setCount(count+1);
    }
  
    return (
      <div>
      <h1 className="padding">WELCOME! {username}</h1>
      <p>Point of Sale system</p>

      <div className="w-full bg-gray-100 p-2 rounded-lg">
      <Link to="/profile" className="bg-gray-800 text-white px-5 py-2 me-3">Profile</Link>
      <Link to="/item" className="bg-gray-800 text-white px-5 py-2 me-3">Item</Link>
      <Link to="/category" className="bg-gray-800 text-white px-5 py-2 me-3">Category</Link>
      <Link to="/order" className="bg-gray-800 text-white px-5 py-2 me-3">Order</Link>
      <button className="bg-gray-800 text-white px-5 py-2 me-3" onClick={logout}>Logout</button>
      </div>
      
      <label>Enter username</label>
  
      <input type="text" onChange ={handleInputChange} />
  
      <h1>Count:{count}</h1> 
      <button onClick={increaseCount}>Increase</button>
      
      
      
      <h2><b>DETAILS</b></h2>
      <Vehicle title="Category" description="Details on categories"/>
      <Vehicle title="Item" description="Details on items"/>
      <Vehicle title="Order" description="Details on orders"/>
    </div>
  )


}

export default Home;
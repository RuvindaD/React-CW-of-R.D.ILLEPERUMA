import './App.css'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Category from './pages/Category'
import Item from './pages/Item'
import Order from './pages/orders/Order'
import CreateOrder from './pages/orders/CreateOrder'
import { AuthProvider } from './Context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() { //Parent component
 return(
  <AuthProvider>
  <BrowserRouter>
  <Routes>
  <Route element={<ProtectedRoute/>}>
    <Route path="/"element={<Home/>}/>
    <Route path="/profile"element={<Profile/>}/>
    <Route path="/category"element={<Category/>}/>
    <Route path="/item"element={<Item/>}/>
    <Route path="/order"element={<Order/>}/>
    <Route path="/order/create"element={<CreateOrder/>}/>
    
    </Route>
   
    <Route path="/auth/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
 );

}

// Defining types for component
// Cut and paste to VehicleType.tsx

//Child component
//Cut and paste to Vehicle.tsx
export default App

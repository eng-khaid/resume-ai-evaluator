import { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink, Outlet,useNavigate} from 'react-router-dom'
import Comp1 from './components/Comp1'
import Comp2 from './components/Comp2'
import Comp3 from './components/Comp3'
import Users from './components/Users'
function App() {
  const [count, setCount] = useState(0);
  const [id,setId] =  useState(0);
  const navigate = useNavigate();
  return (
    <>
    <button onClick={()=>setId((prevId)=>prevId+1)}>Click me</button>
    <button onClick={()=>navigate("/user/10")}>Click me</button>
    <Routes>
      <Route path="/" element={<Comp1/>}/>
      <Route path="/comp2" element={<Comp2/>}>
        <Route path="comp3" element={<Comp3/>}/>
      </Route>
      <Route path="/user/:id" element={<Users/>}/>
    </Routes>  
      <NavLink to="/">Click to See Comp1</NavLink>
      <NavLink to="/comp2">Click to see Comp2</NavLink>
      <NavLink to="comp2/comp3">Click to see Comp3</NavLink>
      <NavLink to={`/user/${id}`}>Click to see userpage</NavLink>    
      <Outlet/>
    </>
  )
}
export default App

import logo from './logo.svg';
import './App.css';
import CreateInventory from './CreateInventory.js'
import Fdata1 from './Data.js'
import Number from './Number.js'
import Register from './Register.js'
import Login from './Login.js'
import Profile from './Profile.js'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthProvider} from "./Auth"
function App() {
  return (
    <AuthProvider>
    <Router>
    <Routes>
      <Route path='/' element = {<Number/>}>
      </Route>
      <Route path='/Profile' element = {<Profile/>}>
      </Route>
      <Route path='/data' element = {<Fdata1/>}>
      </Route>
      <Route path='/Login' element = {<Login/>}>
      </Route>
      <Route path='/Register' element = {<Register/>}>
      </Route>
      <Route path='/CreateInventory' element = {<CreateInventory/>}>
      </Route>
    </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App;

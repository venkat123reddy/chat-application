import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Registration from './components/registration/Registration.jsx'
import Login from './components/login/login.jsx'
import Navbar from './components/navbar/Nav.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Home from './components/home/home.jsx'
import store from './components/store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import GroupChat from './components/groupchat/GroupChat.jsx'
import ChatGroups from './components/groups/ChatGroups.jsx'
import WelcomePage from './components/welcome/Welcome.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
      <Provider store={store}>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
         <Route path="/group" element={<GroupChat />} />
          <Route path="/chatgroup" element={<ChatGroups />} />
          <Route path="/" element = {<WelcomePage/>}></Route>
      </Routes>
    </Provider>
    </BrowserRouter>
  
  </StrictMode>,
)

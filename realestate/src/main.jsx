import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/UserPages/Home.jsx'
import Register from './pages/UserPages/Register.jsx'
import Login from './pages/UserPages/Login.jsx'
import User from './pages/User.jsx'
import Estates from './pages/UserPages/Estates.jsx'

import {BrowserRouter, createBrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Admin from './pages/Admin.jsx'
import RequestHandler from './handlers/RequestHandler.jsx'
import Logout from './pages/UserPages/Logout.jsx'
import Profile from './pages/UserPages/Profile.jsx'

import { ACCESS, REFRESH } from './constants/constants.jsx'
import { jwtDecode } from 'jwt-decode'

import AdminLogin from './admin/pages/AdminLogin.jsx'
import ChatRoomPage from './pages/AgentPages/ChatRoomPage.jsx'
import LoginPage from './pages/AgentPages/LoginPage.jsx'
import UserChatRoom from './pages/UserPages/UserChatRoom.jsx'
import { isLoggedIn } from './functions/common.jsx'
import { GiAnticlockwiseRotation } from 'react-icons/gi'



// const pathConfig = createBrowserRouter([
//   {
//     path: '/',
//     element: <User element={<Home/>}/>,
//   },
//   {
//     path: '/register/',
//     element: <User element={<Register/>}/>,
//   },
//   {
//     path: '/login',
//     element: <User element={<Login/>}/>,
//   },
//   {
//     path: '/logout',
//     element: <User element={<Logout/>}/>,
//   },
//   {
//     path: '/profile',
//     element: <User element={<RequestHandler children={<Profile/>}/>}/>,
//   },
//   {
//     path: '/admin',
//     element: <Admin/>,
//   },
//   {
//     path: '/explore',
//     element: <User element={<Estates/>}/>,
//   },
// ]);



function Content(){
  const [loggedIn, setLoggedIn] = useState(false);

  // alert(loggedIn);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    // if (!accessToken){
    //   setLoggedIn(false);
    // }else{
    //   const accessTokeValidationTime = jwtDecode(accessToken);
    //   const currentTime = Date.now() / 1000;
    //   if (currentTime > accessTokeValidationTime.exp){
    //     setLoggedIn(false);
    //   }else{
    //     setLoggedIn(true);
    //   }
    // }
  
    // if (refreshToken === null){
    //   setLoggedIn(false);
    // }
  });

  // alert(loggedIn);
  

  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User element={<Home/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/login' element={<User element={<Login login={setLoggedIn}/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/logout' element={<User element={<Logout login={setLoggedIn}/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/register' element={<User element={<Register login={setLoggedIn}/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/explore' element={<User element={<Estates/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/profile' element={<User element={<RequestHandler children={<Profile/>}/>} isLoggedIn={loggedIn}/>}/>
        <Route path='/realtor/chat-room' element={<User element={<ChatRoomPage/>} isLoggedIn={loggedIn} />}/>
        <Route path='/realtor/chat-room/login' element={<LoginPage/>}/>
        <Route path='/user/chatroom' element={<User element={<UserChatRoom/>}/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Content/>,
)

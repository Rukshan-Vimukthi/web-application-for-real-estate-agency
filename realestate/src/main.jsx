import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/UserPages/Home.jsx'
import Register from './pages/UserPages/Register.jsx'
import Login from './pages/UserPages/Login.jsx'
import User from './pages/User.jsx'
import Estates from './pages/UserPages/Estates.jsx'

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Admin from './pages/Admin.jsx'
import Logout from './pages/UserPages/Logout.jsx'
import Profile from './pages/UserPages/Profile.jsx'

import AdminLogin from './admin/pages/AdminLogin.jsx'
import ChatRoomPage from './pages/AgentPages/ChatRoomPage.jsx'
import LoginPage from './pages/AgentPages/LoginPage.jsx'
import UserChatRoom from './pages/UserPages/UserChatRoom.jsx'
import { isLoggedIn } from './functions/common.jsx'
import RealtorProfile from './pages/AgentPages/RealtorProfile.jsx'
import AuthStateListener from './handlers/AuthStateListener.jsx'
import Agent from './pages/Agent.jsx'
import Agents from './pages/UserPages/Agents.jsx';



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
  const loggedInReference = useRef(loggedIn);
  const setLoggedInReference = (data) => {
    setLoggedIn(data);
    loggedInReference.current = data;
  }

  // alert(loggedIn);

  useEffect(() => {
    setLoggedInReference(isLoggedIn());
  });

  
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<User element={<Home/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/agents' element={<User element={<Agents/>} isLoggedIn={loggedInReference.current}/>}/>

        <Route path='/login' element={<User element={<Login login={setLoggedInReference}/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/logout' element={<User element={<Logout login={setLoggedInReference}/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/register' element={<User element={<Register login={setLoggedInReference}/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/explore' element={<User element={<Estates/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/profile' element={<User element={<AuthStateListener children={<Profile/>} login={setLoggedInReference}/>} isLoggedIn={loggedInReference.current}/>}/>
        <Route path='/user/chatroom' element={<User element={<UserChatRoom/>} isLoggedIn={loggedInReference.current}/>}/>


        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />

        <Route path='/realtor/' element={<Agent element={<AuthStateListener children={<RealtorProfile />} /> } isLoggedIn={loggedInReference.current} />}/>
        <Route path='/realtor/chat-room' element={<Agent element={<ChatRoomPage/>} isLoggedIn={loggedInReference.current} />}/>
        <Route path='/realtor/login' element={<Agent element={<LoginPage login={setLoggedInReference}/>} isLoggedIn={loggedInReference.current} />}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Content/>,
)

import React, { Suspense } from 'react'
import Home from './Pages/Home/Home.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/SideBar/Sidebar.jsx'
import Signup from './Pages/Auth/Signup.jsx'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Auth/Login.jsx'
import Context from './store/Context.jsx'
import './index.css'
import BottomNav from './components/Navbar/BottomNav.jsx'
import Reset from './Pages/Auth/Reset.jsx'
const Profile = React.lazy(() => import('./Pages/Profile/Profile.jsx'))
const Comments = React.lazy(() => import('./Pages/Comments/Comments.jsx'))
const Saved = React.lazy(() => import('./Pages/saved/Saved.jsx'))
const Followings = React.lazy(() => import('./Pages/Followings/Followings.jsx'))
const EditProfile = React.lazy(() => import('./Pages/Edit_Profile/EditProfile.jsx'))
const UpdatePost = React.lazy(() => import('./Pages/UpdatePost/UpdatePost.jsx'))


function App() {

  return (
    <>
      <Context>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              <Sidebar />
              <Home />
              <BottomNav />
            </>
          } />
          <Route path='/EditProfile' element={
            <>
              <Navbar />
              <Sidebar />
              <Suspense fallback={<div>Loading...</div>}>
                <EditProfile />
              </Suspense>
              <BottomNav />
            </>
          } />
          <Route path='/UpdatePost/:id' element={
            <>
              <Navbar />
              <Sidebar />
              <Suspense fallback={<div>Loading...</div>}>
                <UpdatePost />
              </Suspense>
              <BottomNav />
            </>
          } />
          <Route path='/Following' element={
            <>
              <Navbar />
              <Sidebar />
              <Suspense fallback={<div>Loading...</div>}>
                <Followings />
              </Suspense>
              <BottomNav />
            </>
          } />
          <Route path='/profile/:username' element={
            <>
              <Navbar />
              <Sidebar />
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
              <BottomNav />

            </>
          } />
          <Route path='/post/:id' element={
            <>
              <Navbar />
              <Sidebar />
              <Suspense fallback={<div>Loading...</div>}>
                <Comments />
              </Suspense>
              <BottomNav />
            </>
          } />
          <Route path='/saved' element={<>
            <Navbar />
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
              <Saved />
            </Suspense>
            <BottomNav />
          </>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/reset/:token' element={<Reset />} />
        </Routes >
      </Context>
    </>
  )
}

export default App

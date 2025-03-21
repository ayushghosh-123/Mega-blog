
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './Appwrite/auth.js'
import {login,logout} from './Store/autSlice'
import Footer from './component/Footer/Footer'
import Header from './component/Header/Header'
import { Outlet } from 'react-router-dom'

function App() {
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() =>{
      authservice.getCurrentUser()
      .then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
    }, [])

 return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
    <div className='w-full block'>
      <Header/>
      <main>
        <Outlet/> 
      </main>
      <Footer/>
    </div>
  </div>
 ) : null }


export default App

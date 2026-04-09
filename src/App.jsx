import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './Appwrite/auth.js'
import { login, logout } from './Store/autSlice'
import Footer from './component/Footer/Footer'
import Header from './component/Header/Header'
import { Outlet } from 'react-router-dom'

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        authservice.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout())
                }
            })
            .finally(() => setLoading(false))
    }, [dispatch])

    return !loading ? (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <Footer />
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
        </div>
    )
}

export default App

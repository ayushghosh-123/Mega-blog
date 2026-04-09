import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../Appwrite/auth'
import { logout } from '../../Store/autSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button
            className='px-5 py-2 text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-brand-accent/10 hover:border-brand-accent/20 hover:text-brand-accent'
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
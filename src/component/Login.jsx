import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../Store/autSlice'
import {Input, Button, Logo} from "./index"
import { useDispatch } from 'react-redux'
import Service from '../Appwrite/Config'
import { set, useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
    }
  return (
    <div>

    </div>
  )
}

export default Login
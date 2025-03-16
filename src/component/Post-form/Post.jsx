import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from "../index"
import Service from '../../Appwrite/Config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Post({post}) {
    const {register , handleSubmit , watch, setValue, control, getvalues } = useForm({
        defaultValues : {
            title: post?.title || '',
            slug: post?.slug|| '',
            content: post?.status || '',
            status: post?.status || 'active',

        },
    })


    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) =>{
        if(post){
            const file = data.image[0] ? Service.uploadFile(data.image[0]) : null
            if(file){
                Service.deleteFile(post.featuredImage)
            }
            const dbPost = await Service.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id: undefined,
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            } 
        }else {
            const file = await Service.uploadFile(data.image[0]);
            if(file){
                const fileId =  file.$id
                data.featuredImage = fileId
                const dbPost = await Service.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g,'-')
                .replace(/\s/g, '-')

            return ''
        
    }, [])

    React.useEffect(() => {
        const subscription = watch(()=>{
            
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
  return (
    <div>Post</div>
  )
}

export default Post
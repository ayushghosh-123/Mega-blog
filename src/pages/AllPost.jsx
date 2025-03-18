import React, {useState, useEffect} from 'react'
import Service from '../Appwrite/Config'
import Container from '../Container/Container'
import Postcard from '../component/Postcard'

function AllPost() {
    const [post, setPost] = useState([])
    useEffect(() => {}, [])

    Service.getPosts([]).then((post) => {
        if(post){
            setPost(post.documents)
        }
    })

  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
           {post.map((post)=>(
                <div className='p-2 w-1/4'>
                    <Postcard post={post}/>                    
                 </div>
            ))}
           </div>
        </Container>
    </div>
  )
}

export default AllPost
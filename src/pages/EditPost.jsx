import React, {useEffect, useState} from 'react'
import Container from '../Container/Container'
import Post from '../component/Post-form/Post'
import Service from '../Appwrite/Config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(slug){
      Service.getPost(slug).then((post) => {
        if(post){
          setPost(post)
        }
      })
    }
      else{
        navigate('/')
      }
    
  }, [slug, navigate])

  return post? (
    <div className='py-8'>
      <Container>
        <Post post={post}/>
      </Container>
    </div>
  ) : null
}

export default EditPost
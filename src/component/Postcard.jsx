import Service from "../Appwrite/Config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-500 box-border h-full'>
                <div className='w-full h-48 overflow-hidden bg-slate-800 flex items-center justify-center'>
                    {featuredImage ? (
                        <img
                            src={Service.getFilePreview(featuredImage)}
                            alt={title}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        />
                    ) : (
                        <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">No Image</div>
                    )}
                </div>
                <div className='p-5'>
                    <h2 className='text-sm font-semibold opacity-60 mb-2 uppercase tracking-widest'>Article</h2>
                    <h2 className='text-xl h-14 font-bold text-white line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors duration-300'>
                        {title}
                    </h2>
                    <div className='mt-4 flex items-center text-brand-primary font-medium text-sm'>
                        Read Post
                        <svg className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'/>
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard

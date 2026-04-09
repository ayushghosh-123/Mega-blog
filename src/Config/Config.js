const conf = {
    appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinyMCEApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default conf
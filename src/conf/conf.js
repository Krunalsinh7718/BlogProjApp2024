

const conf = {
    appwriteProjectUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwritePorjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymiceApiKey : String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default conf;
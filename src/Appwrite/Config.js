import conf from "../Config/Config";
import { Client,  ID , Databases, Storage, Query } from "appwrite";

export class service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId);
    
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featureImage, status, userId}){
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
           console.log("Appwrite service :: createPost :: error", error) 
        }
    }

    async updatePost(slug, {title, content, featureImage, status }){
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite error :: error", error)
        }
    }

    async deletePost(slug, {title, content, featureImage, status}){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
    
        } catch (error) {
            console.log("Appwrite error here:: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("appwrite get user detail error :: error", error)
            return false
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId, // Ensure conf is correctly imported or defined
                conf.appwriteCollectionID,
                queries,
                100 // Ensure this is a valid argument
            );
         } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrie service :: uploadFile :: error", error)
            return false
        }
    }
    
    async deleteFile(fileId){
        try {
            return  await  this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite the error are happen:: error ", error)
        }
    }

    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const Service = new service()

export default Service
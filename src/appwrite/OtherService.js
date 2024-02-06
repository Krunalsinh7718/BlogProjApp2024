import { Client, Account, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class OtherService {
    client = new Client();
    account;
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteProjectUrl)
            .setProject(conf.appwritePorjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createBlog({ title, slug, content, articleImageId, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    articleImageId,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite other service :: createBlog :: error", error);
            return false;
        }
    }

    

    async getBlog(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id);

        } catch (error) {
            console.log("Appwrite other service :: getBlog :: error", error);
            return false;
        }
    }

    async deleteBlog(documentId){
        try {
            return this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                documentId);
        } catch (error) {
            console.log("Appwrite other service :: deleteBlog :: error", error);
            return false;
        }
    }

    async updateBlog(documentId,{title, content, articleImageId, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                documentId,
                {
                    title, 
                    content, 
                    articleImageId, 
                    status
                });
        } catch (error) {
            console.log("Appwrite other service :: updateBlog :: error", error);
            return false;
        }
    }

    async getAllBlog(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                queries);
        } catch (error) {
            console.log("Appwrite other service :: getAllBlog :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite other service :: uploadFile :: error", error);
            return false;
        }
    }

    async getFile(fileId){
        try {
            return await this.storage.getFile(
                conf.appwriteBucketId, 
                fileId);
        } catch (error) {
            console.log("Appwrite other service :: getFile :: error", error);
            return false;
        }
    }

    getFilePreview (fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite serive :: getFilePreview :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId, 
                fileId);
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

}

const service = new OtherService();
export default service;

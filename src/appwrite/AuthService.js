import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteProjectUrl)
            .setProject(conf.appwritePorjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            
            const userAccount = await this.account.create(ID.unique(), email, password, name);
    
            if(userAccount){
                return this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
            return false;
        }

    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
            return false;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
            return false;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

}

const service = new AuthService();
export default service;

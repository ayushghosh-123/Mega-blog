import conf from "../Config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account 


    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account()
    }

    async createAccount({ email, password, name }) {
        try {
            const userId = ID.unique(); 
            const UserAccount = await this.account.create(userId, email, password,name);
            if(UserAccount){
                // call another method
                return this.login({email, password})
            }
            else{
                return UserAccount
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({email, password}){
        try {
            const promise = await this.account.createEmailPasswordSession(email, password)
            return promise
        } catch (error) {
            console.log("Account create an error", error)
            throw error
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error", error)
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service logout", error)
        }
    }
}

const authservice = new  AuthService()

export default authservice
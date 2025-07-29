import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }


    // SignUp
    async createAccount({email, password, name}){
        try{
            await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email,password});
            }else{
                return userAccount;
            }

        }catch(error) {
            throw error;
        }
    }

    // LogIn
    async login(email, password){
        try {
            return await this.account.createEmailSession(email.password);
        } catch(error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Apprite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    // LogOut
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);

        }
    }

}

const authService = new AuthService();

export default authService;
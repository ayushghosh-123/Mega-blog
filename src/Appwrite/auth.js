import conf from "../Config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectId);

    // Pass the client instance when creating Account
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userId = ID.unique();

      // Ensure 'this.account' is properly initialized
      const UserAccount = await this.account.create(
        userId,
        email,
        password,
        name
      );

      if (UserAccount) {
        // Automatically log in after account creation
        return this.login({ email, password });
      } else {
        return UserAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const promise = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return promise;
    } catch (error) {
      console.log("Account create an error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions(); // Ensure the session is deleted properly
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Appwrite service logout", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;

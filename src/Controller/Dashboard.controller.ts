import type {All_Messages, User_msg} from "../Others/utilities.ts";
import React from "react";
import {DatabaseOperation} from "../Database/DatabaseOperation.ts";
import {Authentication_Firestore} from "../Database/Authentication.ts";

export class DashboardController{

    private readonly setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>

    private readonly server = new DatabaseOperation();
    private readonly serverAuth = new Authentication_Firestore();


    constructor({setMessageHeader}: { setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>
    }){
        this.setMessageHeader = setMessageHeader;
    }

    /**
     * Fetch all Message List from Firestore
     * @param id : string User ID
     */
    fetchAllMessageList = async ({id}: {id: string}) => {
        try {
            const response = await this.server.getAllConversationList({id});
            this.setMessageHeader(response);
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
        }
    }
    /**
     * Create new Conversation On the Database
     * @param id : string User ID
     * @param conversation : All_Messages Starter Conversation kit
     */
    createNewConversation = async({id, conversation} : {id: string, conversation:All_Messages}) => {
        try {
            return await this.server.createNewConversation({id: id, messageHeader: conversation});
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
        }

    }
    /**
     * Sign out from Database
     * @constructor
     */
    SignOut = async () => {
        try {

            await this.serverAuth.logout();

        } catch (error) {
            if(error instanceof Error){
                console.error("Logout Error:", error.message);
            }
        }
    }





}

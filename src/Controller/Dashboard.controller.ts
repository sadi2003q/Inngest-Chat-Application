import type {All_Messages, User_msg} from "../Others/utilities.ts";
import React from "react";
import {DatabaseOperation} from "../Database/DatabaseOperation.ts";


export class DashboardController{

    private readonly setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>

    private readonly server = new DatabaseOperation();


    constructor({setMessageHeader}: { setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>
    }){
        this.setMessageHeader = setMessageHeader;
    }

    fetchAllMessageList = async ({id}: {id: string}) => {
        try {
            console.log("ID : ", id);
            const response = await this.server.getAllConversationList({id});
            console.log("Response : ", response);
            this.setMessageHeader(response);
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
        }
    }

    createNewConversation = async({id, conversation} : {id: string, conversation:All_Messages}) => {
        try {
            return await this.server.createNewConversation({id: id, messageHeader: conversation});
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);
            }
        }

    }




}

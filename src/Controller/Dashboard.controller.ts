import type {User_msg} from "../Others/utilities.ts";
import React from "react";
import {DatabaseOperation} from "../Database/DatabaseOperation.ts";


export class DashboardController{

    private readonly setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>

    private readonly server = new DatabaseOperation();


    constructor({setMessageHeader}: {
        setMessageHeader: React.Dispatch<React.SetStateAction<User_msg[]>>
    }){
        this.setMessageHeader = setMessageHeader;
    }


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


}

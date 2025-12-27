import type {SignupStatus, user_info} from "../Others/utilities.ts";
import React from "react";
import {Authentication_Firestore} from "../Database/Authentication.ts";
import {DatabaseOperation} from "../Database/DatabaseOperation.ts";


export class SignUpController {

    private readonly userInfo: user_info;
    private readonly setStatus: React.Dispatch<React.SetStateAction<SignupStatus>>

    private server : Authentication_Firestore = new Authentication_Firestore();
    private server_database : DatabaseOperation = new DatabaseOperation();

    constructor({userInfo, setStatus}: {
        userInfo: user_info,
        setStatus: React.Dispatch<React.SetStateAction<SignupStatus>>
    }) {
        this.userInfo = userInfo;
        this.setStatus = setStatus;
    }

    SignUp = async() => {
        try {
            await this.server.signupWithEmail({
                email: this.userInfo.info.email,
                password: this.userInfo.password
            })

        } catch (error) {
            if(error instanceof Error) {
                this.setStatus({ type: 'error', message: 'Unable to Create Account, Please try Again Later...' });
            }
        }
    }


    SaveInformation_toDatabase = async({id}: {id: string}) => {
        try {
            await this.server_database.Save_UserInformation({
                userInformation: this.userInfo.info,
                id: id
            })
        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }





}
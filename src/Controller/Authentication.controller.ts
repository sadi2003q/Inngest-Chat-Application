
import {type loginInterface, type LoginStatus} from "../Others/utilities.ts";
import {Authentication_Firestore} from '../Database/Authentication.ts'
import React from "react";

export class AuthenticationController {
    private readonly loginInterface: loginInterface;
    private readonly setStatus:  React.Dispatch<React.SetStateAction<LoginStatus>>;
    private controller: Authentication_Firestore = new Authentication_Firestore();



    constructor({loginInformation, setStatus}:{
        loginInformation:loginInterface,
        setStatus:  React.Dispatch<React.SetStateAction<LoginStatus>>
    }) {
        this.loginInterface = loginInformation;
        this.setStatus =  setStatus;
    }




    login = async () => {
        if (!this.loginInterface.email && this.loginInterface.password.length < 6) {
            this.setStatus({ type: 'error', message: 'Invalid email or password. Please try again.' });
            return;
        }
        try {
            this.setStatus({ type: null, message: '' });
            await this.controller.loginWithEmail({
                email: this.loginInterface.email,
                password: this.loginInterface.password
            })

            this.setStatus({
                type: 'success' ,
                message: 'Login successfully'
            })

        } catch (error) {
            if(error instanceof Error) {
                this.setStatus({
                    type: 'error',
                    message: error.message
                })
            }
        }
    }

}



// filepath: src/Controller/SignUp.controller.ts

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
            const uid = await this.createUser();
            if(uid) await this.SaveInformation_toDatabase({id: uid});

            this.setStatus({ type: 'success', message: 'Signup Successful' });


        } catch (error) {
            if(error instanceof Error) {
                this.setStatus({ type: 'error', message: error.message });
            }
        }
    }


    createUser = async() => {

        if(!this.userInfo.info.terms) {
            this.setStatus({
                type: 'error',
                message: "You must agree to the terms and condition"
            })
            return;
        }


        try {
            return await this.server.signupWithEmail({
                email: this.userInfo.info.email,
                password: this.userInfo.password
            })

        } catch (error) {
            if(error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }


    SaveInformation_toDatabase = async({id}: {id: string}) => {
        try {
            console.log("Function Called id : ", id);
            await this.server_database.Save_UserInformation({
                userInformation: this.userInfo.info,
                id: id
            })
            console.log("Saved to Database");
        } catch (error) {
            if(error instanceof Error) {
                this.setStatus({ type: 'error', message: error.message });
            }
        }
    }

    getPasswordStrength = () => {
        const pwd = this.userInfo.password;
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
        return strength;
    };



}
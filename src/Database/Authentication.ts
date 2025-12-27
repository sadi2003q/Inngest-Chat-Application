// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app } from '../firebase.ts'

// Initialize Auth
const auth = getAuth(app);


export class Authentication_Firestore {
    // Signup function
    signupWithEmail = async ({email, password}: {email: string, password: string}) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user.uid);
            return userCredential.user;
        } catch (error) {
            if(error instanceof Error) {
                console.error("Signup Error:", error.message);
                throw error;
            }

        }
    };

    // Login function
    loginWithEmail = async ({email, password}: {email: string, password: string}) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            if(error instanceof Error) {
                console.error("Login Error:", error.message);
                throw error;
            }

        }
    };

    // Logout function
    logout = async () => {
         try {
             await signOut(auth);
         } catch (error) {
             if(error instanceof Error) {
                 console.error("Logout Error:", error.message);
                 throw error;
             }

        }
    };
}





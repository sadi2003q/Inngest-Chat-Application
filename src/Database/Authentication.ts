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
            return userCredential.user.uid;
        } catch (error) {
            if(error instanceof Error) {
                console.error("Signup Error:", error.message);
                throw error;
            }

        }
    };

    // Login function
    loginWithEmail = async ({ email, password }: { email: string; password: string }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            let message = "Login failed try Again Later";
            if(error instanceof Error) {
                message = "Invalid Credentials, Please Make sure email and password is correct";
            }

            throw new Error(message);

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



const authService = new Authentication_Firestore();




// await authService.loginWithEmail({
//     email: "test@example.com",
//     password: "123456"
// })

try {
    const result = await authService.loginWithEmail({
        email: "ttest@example.com",
        password: "123456"
    });
    console.log("Login Successful:", result.user.uid);
} catch (error) {
    if(error instanceof Error) {
        console.log("Login Failed:", error.message);
    }
}

import {DatabaseName, type UserInformation} from "../Others/utilities.ts";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.ts"; // adjust path




export class DatabaseOperation {


    Save_UserInformation = async ({userInformation, id} : {
        userInformation: UserInformation,
        id: string
    }) => {
        try {
            console.log(userInformation)
            console.log("Database that is going to store all information : ", DatabaseName.UserDatabase)
            console.log("ID that is going to store the information : ", id);

            const ref = doc(db, DatabaseName.UserDatabase, id);
            await setDoc(ref, {
                ...userInformation,
                createdAt: new Date(),
            })

        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }


    DeleteUser_fromFirestore = async({id}: {id: string}) => {
        try {
            const ref = doc(db, DatabaseName.UserDatabase, id);
            await deleteDoc(ref);
        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

}



// filePath : src/Database/DatabaseOperation.ts


import {DatabaseName, type UserInformation} from "../Others/utilities.ts";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.ts"; // adjust path




export class DatabaseOperation {


    Save_UserInformation = async ({userInformation, id} : {
        userInformation: UserInformation,
        id: string
    }) => {
        try {


            console.log("ID : ", id);

            const ref = doc(db, "Chat_User", id);
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

// const database = new DatabaseOperation();
//
// try {
//     await database.Save_UserInformation({
//         id: "23456",
//         userInformation:{
//             firstName:"adnan",
//             lastName: "abdullah",
//             email:"adnan",
//             api:"124",
//             terms :true
//         }
//     })
// } catch (error) {
//     if(error instanceof Error) {
//         console.log(error.message);
//     }
// }
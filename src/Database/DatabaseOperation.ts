
// filePath : src/Database/DatabaseOperation.ts


import {
    type All_Messages,
    type ConversationMessage,
    DatabaseName,
    type User_msg,
    type UserInformation
} from "../Others/utilities.ts";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, query, orderBy} from "firebase/firestore";
import {db} from "../firebase.ts";
import type {AIResponse, Message} from "../Model/model.aiResponse.ts"; // adjust path


export class DatabaseOperation {


    // ***  User Information Related Query  ***
    Save_UserInformation = async ({userInformation, id} : {
        userInformation: UserInformation,
        id: string
    }) => {
        try {

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

    getUserInformation = async ({id}: {id: string}) => {
        try {
            const ref = doc(db, DatabaseName.UserDatabase, id);
            return await getDoc(ref);
        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }







    // ***  All conversation Related Query  ***
    createNewConversation = async ({id, messageHeader}: {id: string, messageHeader: All_Messages}) => {
        try {

            const ref = collection(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list);
            const docID = await addDoc(ref, messageHeader);
            console.log("ID : ", docID.id);
            return docID.id;

        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    getAllConversationList = async ({id}: {id: string}) => {
        try {
            const ref = collection(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list);
            const response = await getDocs(ref);

            // Map through documents and include the UID as the first element
            return response.docs.map(doc => { return { uid: doc.id, ...(doc.data() as User_msg) }; });
        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    addMessage = async ({uid, cID, message}: {uid: string, cID: string, message: ConversationMessage}) => {
        try {

            const ref = collection(db, DatabaseName.UserDatabase, uid, DatabaseName.AllChats_list, cID, DatabaseName.AllChats);
            await addDoc(ref, message)

        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    getAllConversationMessage = async ({id, cID}: {id: string, cID: string}) => {
        try {
            const ref = collection(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list, cID, DatabaseName.AllChats);
            // 🔑 ORDER BY time (ascending)
            const q = query(ref, orderBy("time", "asc"));
            const response = await getDocs(q);
            
            
            const allMessages:unknown =  response.docs.map(doc => {
                return {uid: doc.id, ...doc.data()};
            });
            
            
            const messages: Message[] = [];
            
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            for (const message of allMessages) {
                if (message.isUser) {
                    messages.push({
                        type: "user",
                        text: message.text, // assuming your message object has a 'text' property
                    });
                } else {
                    messages.push({
                        type: "ai-structured",
                        data: JSON.parse(message.text) as AIResponse,
                    });
                }
            }

            return messages;
            
            
            
            

        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    updateSummary = async ({id, cID, summary}: {id: string, cID: string, summary: string}) => {
        try {
            const ref = doc(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list, cID)
            await updateDoc(ref, {
                summary: summary,
            });
        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    updateMessageList = async ({id, cID, lastMessage, lastMessage_time}: {id: string, cID: string, lastMessage: string, lastMessage_time: Date}) => {
        try {
            const ref = doc(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list, cID)
            await updateDoc(ref, {
                lastMessage: lastMessage,
                lastMessage_time: lastMessage_time,
            });
        } catch (error) {
            let message = "Error Saving Information into Firestore";
            if(error instanceof Error) {
                message = error.message;
            }

            throw new Error(message);
        }
    }

    updateName = async ({id, cID, name}: {id: string, cID: string, name: string}) => {
        try {
            const ref = doc(db, DatabaseName.UserDatabase, id, DatabaseName.AllChats_list, cID)
            await updateDoc(ref, {
                name: name,
            });
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
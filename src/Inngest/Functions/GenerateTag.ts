import {inngest} from "../client.ts";


export const generateTag = inngest.createFunction(
    {
        name: 'Question Id Generator',
        id: 'generate-tag'
    },

    {event: 'userQuestion/generate-tag'},
    async ({event, step}) => {

        const question = event.data.question;





        return {
            success: true,
            data: 'Generated Tag!'
        }
    }
)


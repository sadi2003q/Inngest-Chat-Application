// filepath: src/INGEST/Functions/api-handler.ts

import {inngest} from "../client.ts";
import {generateSummary} from '../../GeminiResponse.ts'
import { wait } from "../../utilities.ts";

export const callGemini = inngest.createFunction(
    {
        name: "call Gemini",
        id: "call-gemini",
        retries: 2,
        timeouts: {
            finish: "10s"
        }
    },
    { event: "call/gemini" },

    async ({event, step}) => {
        const {currentSummary, question, finalAnswer} = event.data.question;

        const response = await step.run("generateSummary", async () => {
            console.log("Generating summary from Gemini.....")

            // return await generateSummary({
            //     conversationSummary: currentSummary,
            //     question: question,
            //     finalText: finalAnswer
            // });


            throw new Error("No summary found.");

        })


        await step.run("Save-To-Database", async () => {

            // Saved to Memory
            // const conversationSummary = response;

            await wait({time: 1000})
            console.log("Saved to Memory : ", response);
        })

        console.log("✅ Inngest Function initialised");
        return {
            success: true,
            message: "Summary is generated and Saved to Database"

        }


    }
)



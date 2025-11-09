import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "./db";

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {    
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        },
        google: {
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }

    }
})
export interface SessionProps {
    name: string,
    email: string,
    image?:  string | null | undefined,
    createdAt: Date,
    updatedAt: Date,
    emailVerified: boolean,
    id: string
}
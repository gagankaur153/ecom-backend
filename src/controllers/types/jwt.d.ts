



export interface MyjwtPayload {
    id: string,
    email: string,
    username: string,
    role: string,
    iat : number,
    exp : number
}
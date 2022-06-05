export interface IBlog {
    _id?:string,
    title: string,
    subtitle: string,
    body: string,
    image: string[],
    tags: string[],
    createdAt?: string,
    updatedAt?: string,
}
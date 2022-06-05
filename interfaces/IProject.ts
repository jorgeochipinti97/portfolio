export interface IProject {
    _id?: string;
    image: string[],
    title: string,
    description: string,
    section: ISection[],
    tags: string[],
    github?: string,
    link?:string,
}

interface ISection {
    id?: string,
    step: string,
    title: string,
    body: string,
    image: string,
}
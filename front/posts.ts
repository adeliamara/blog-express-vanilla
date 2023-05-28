export interface Post {
    id: number;
    title: string;
    text: string;
    created_at: string;
    likes: number;
}

export const posts: Post[] = [];
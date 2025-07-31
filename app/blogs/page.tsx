import { getBlogs } from '@/lib/firestoreFunctions';
import BlogsPage from '@/components/BlogsPage'; // Import the client component

export interface blogType{
    id: string;
    image: string;
    title: string;
    author: string;
    date: string;
    summary: string;
    content: string;
};

export default async function BlogsPageServer(){
    const blogs: blogType[] = await getBlogs();

    return <BlogsPage initialBlogs={blogs} />;
}
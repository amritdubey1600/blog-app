import { blogType } from "@/app/blogs/page";
import { db } from "./firebase";
import { collection, doc, addDoc, getDocs, getDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore/lite";

const blogCollection = collection(db, "blogs");

export async function addBlog(image: string, title: string, author:string, summary: string, content: string) {
  const docRef = await addDoc(blogCollection, {
    image,
    title,
    content,
    author,
    summary,
    date: new Date().toISOString().split('T')[0]
  });

  return docRef.id;
}

export async function getBlogs(): Promise<blogType[]> {
  const snapshot = await getDocs(blogCollection);
  
  return snapshot.docs.map(doc => {
    const data = doc.data() as Omit<blogType, 'id'>; // Tell TS what kind of data to expect
    return { id: doc.id, ...data };
  });
}

export async function getBlog(id: string): Promise<blogType> {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) throw new Error('Docment not found.');
    
    const data = docSnap.data() as Omit<blogType,"id">;
    return {id: docSnap.id, ...data};
}

export async function deleteBlog(id: string): Promise<void>{
    try{
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef).then(() =>{
        console.log("Deleted Successfully!");
      })
    } catch(error){
      console.error("Error", error);
    }
}


import React,{ useState,useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from 'axios'
export default function Homepage() {
  const {search} = useLocation();
  

  const [posts,setPosts] = useState([]);
  const fetchPosts = async()=>{
    try {
     const response = await axios.get('/api/post'+search);
     setPosts(response.data);
    } catch (error) {
     console.log(error.message)
    }
   }

  useEffect(()=>{
    
    fetchPosts();
  },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from 'axios'
import{Context} from '../../context/Context'
export default function SinglePost() {
  const location = useLocation();
  const path = (location.pathname.split('/')[2]);
  const [post,setPost]=useState({});
  const PF = 'http://localhost:5000/images/';

  const [updateMode,setUpdateMode] = useState(false);
  const[title,setTitle] = useState('');
  const[descritpion,setDescription] = useState('');









  const{user} = useContext(Context);
  const getPost = async ()=>{
    const {data} = await axios.get(`/api/post/${path}`);
    setPost(data);
  }

const deletePost = async()=>{
  try {
    await axios.delete('/api/post/'+post._id,{data:{username:user.username}})
    // window.location.replace('/');
    setUpdateMode(false);
  } catch (error) {
      console.log(error)
  }
}
const handleUpdate =async () =>{
  try {
    await axios.put('/api/post/'+post._id,
    {username:user.username,title,descritpion})
    window.location.reload();
  } catch (error) {
      console.log(error)
  }
}

  useEffect(()=>{
    getPost();
  },[path])
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
       {post.photo&&( <img
          className="singlePostImg"
          src={PF+post.photo}
          alt=""
        />)}
        <h1 className="singlePostTitle">
          {updateMode?<input 
          tpe="text" 
          value={title} 
          className="singlePostTitleInput" 
          onChange={(e)=>setTitle(e.target.value)}
          />:(
          <h1 className="singlePostTitle">

          {title}
            
          {post.username===user?.username&&(
            <div className="singlePostEdit">
                 <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                 <i className="singlePostIcon far fa-trash-alt" onClick={deletePost}></i>
              </div>
          )}
          </h1>
          )}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
            {updateMode?
            <textarea  
            value={descritpion} 
            className="singlePostDescInput"
            onChange={(e)=>setDescription(e.target.value)}
            />:(
                <p className="singlePostDesc">
                {descritpion}
              </p>
            )}
      </div>
              {updateMode&&(
      <button className="singleUpdate" onClick={handleUpdate}>Update</button>

              )}
    </div>
  );
}

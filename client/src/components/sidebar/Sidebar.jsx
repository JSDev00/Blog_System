import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from 'axios'
export default function Sidebar() {
  const[cats,setCats] = useState([]);
  const getCat = async()=>{
    const res = await axios.get('/api/category');
    console.log(res.data);
    setCats(res.data)
  }
  useEffect(()=>{
    getCat();
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat)=>(
            <Link className="link" to={`/?cat=${cat.categoryname}`}>
            <li className="sidebarListItem" >{(cat.categoryname)}</li>
            </Link>
          ))}
            
            {/* <Link className="link" to="/posts?cat=Life"> */}
              
            {/* </Link> */}
        
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}

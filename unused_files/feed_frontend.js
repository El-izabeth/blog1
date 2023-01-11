import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Feed(){
  
    const [data, setData] = useState([]);
    const [post,setPost] = useState("");
    useEffect(() => {
        async function func() {
          try {
            const res = await fetch(`http://localhost:8800/api/feed/`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const data = await res.json();
            
            // Set the new component state using the data
            setData(data);
          } catch (err) {
            console.log(err);
          }
        }
        func();
      }, []);
        
     
       //let posts = JSON.stringify(data);
        
       console.log(data);
       console.log(data.length);
       let n = data.length;
       let contents = [];
       let authors = [];
       //let date = new Array();
       let time = [];
       let timestamp = [];
       
      for(let i = 0; i < n; i++){
        contents[i] = data[i].content;
        authors[i] = data[i].author;
        timestamp[i] = data[i].createdAt;
        time[i] = new Date(timestamp[i]);
       
      }
    const handleDelete = async(e)=>{
      
      e.preventDefault();
      
      const author = userDetails.username;
      let result = await fetch(`http://localhost:8800/api/feed/delete/${userDetails._id}`,{
            method:'delete',
            body:JSON.stringify({post,author}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        
        //console.log(await result.json());

    }
      const handlePost = async(e) => {
        
        e.preventDefault();
        
        if(!userDetails){
          console.log("login to post!");
          alert("login to post!");
          return;
        }
        const author = userDetails.username;
        let result = await fetch(`http://localhost:8800/api/feed/post/${userDetails._id}`,{
            method:'post',
            body:JSON.stringify({post,author}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        result = JSON.stringify(result);
        console.log(result);   
    }
    //let { posts } = await display();
    //console.log("outside"+posts);
    const userDetails = JSON.parse(window.localStorage.getItem('user'));
        
    const funcCallback = (cb) => {
        return cb();
      };
        
   
    return(
        <div className='feedBG'>
          <p>     </p>
             <button className='backButton'><Link to="/dashboard">back</Link></button>
             <label className='label'>
               enter thought:
                
                <input 
                    className='input'
                    type='text'
                    name='post'
                    value={post}
                    onChange={(e)=>setPost(e.target.value)}
                />
            </label>
             <button onClick={handlePost}>
            
                Post
            
            </button>
            <h3>Comments:</h3>
            {
                funcCallback(() => {
                    const row = [];
                    for (var i = data.length-1; i >= 0; i--) {
                  
                        row.push(
                           
                            <div className='texts'>
                                <h4 key={i}>{authors[i]} : {contents[i]}</h4>
                                <p key={i}>(date: {time[i].toString()})</p>
                                
                            </div>
                        );
                        if(authors[i]==userDetails.username){
                          row.push(
                          <button onClick={handleDelete}>delete</button>
                          )}
                    }
                    return row;
                })
            }
            
           
            
        </div>
    )
}
    


export default Feed;
//ll

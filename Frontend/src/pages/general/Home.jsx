import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css';
import ReelFood from '../../components/ReelFeed';

const Home = () => {

  const [videos, setVideos] = useState([])

  useEffect(()=>{
    axios.get('https://localhost:3000/api/food',{withCredentials:true})
    .then(res => {
      console.log(Response.data);
      setVideos(res.data.foodItems);
    })
    .catch(()=>{
      console.log("Error while fetching videos");
    })
  },[])

  async function likeVideo(item){
    try{
       const response = await axios.post('https://localhost:3000/api/food/like',{foodId:item._id},{withCredentials:true})
       if(response.data.like){
          console.log("Video liked");
          setVideos((prev)=>prev.map((v)=>v._id === item._id ? {...v,likeCount: v.likeCount + 1, isLiked:true} : v))
       }
       else{
          console.log("Video unliked");
          setVideos((prev)=> prev.map((v)=> v._id === item.id ? {...v,likeCount: v.likedCount - 1, isLiked: false}: v))
       }
    }
    catch(err){
      console.log("Error in the liked function", err);
    }
  }

  async function saveVideo(item){
     try{
        const response = await axios.post('https://localhost:3000/api/food/save',{foodId:item._id},{withCredentials:true})
        if(response.data.save){
           setVideos((prev)=>prev.map((v)=> v._id === item._id ? {...v, savesCount: v.savesCount + 1}: v))
            console.log("Video saved");
        }
        else{
            setVideos((prev)=> prev.map((v)=> v._id === item._id ? {...v, savesCount: v.savesCount - 1}: v))
        }
     }
     catch(err){
        console.log("Error in the save function", err);
     }
  }
  return (
     <ReelFood
        items = {videos}
        onLike = {likeVideo}
        onSave = {saveVideo}
        emptyMessage='No Video Available...'
     />
  )
}

export default Home
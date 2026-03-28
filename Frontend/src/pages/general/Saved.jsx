import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed.jsx'

const Saved = () => {
    const [videos,setVideos] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/api/food/save',{withCredentials:true})
        .then(response => {
            const savedFoods = response.data.savedFoods.map((item)=>({
                _id: item.food._id,
                video: item.food.video,
                description: item.food.description,
                likeCount:item.food.likeCount,
                savesCOunt: item.food.savesCount,
                commentCount: item.food.savesCount,
                commentsCount: item.food.commentsCount,
                foodPartner: item.food.foodPartner,
            }))
            setVideos(savedFoods)
        })
    }, [])

    const removesaved = async (item) => {
        try{
            await axios.post("http://localhost:3000/api/food/save",{foodId: item._id},{withCredentials:true})
            setVideos((prev) => prev.map((v)=> v._id === item._id ? {...v,svedCount: Math.max(0,(v.sacesCount ?? 1) - 1)}: v))
        }
        catch{
            console.log("Error in removing saved video");
        }
    }
  return (
     <ReelFeed
        items={videos}
        onSave={removesaved}
        emptyMessage='No Saved Videos Yet...'
     />
  )
}

export default Saved

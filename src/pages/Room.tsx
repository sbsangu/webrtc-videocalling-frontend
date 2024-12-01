import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContex";
import UserFeed from "../components/UserFeed";



const Room:React.FC=()=>{

 
 const {id}=useParams();
 const {socket,user,stream}=useContext(SocketContext);
 const fetchRoomParticipants=({roomId,participants}:{roomId:string,participants:string[]})=>{
  console.log("Fetching participants");
  console.log(roomId,participants)
}

 useEffect(()=>{

  if(user) {
   socket.emit("joined-room",{roomId:id,peerId:user._id});

   socket.on("get-users",fetchRoomParticipants);
 }


 },[id,socket,user])

 return <div>
  Room:{id}
  <UserFeed stream={stream}/>
 </div>
}

export default Room;
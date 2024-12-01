import Peer from "peerjs";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import SocketIoClient from "socket.io-client"
import { v4 } from "uuid";


const WS_SERVER="http://localhost:5000"



const socket=SocketIoClient(WS_SERVER);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext=createContext<any|null>(null);

interface Props{
 children:React.ReactNode
}

export const SocketProvider:React.FC<Props>=({children})=>{

  const navigate=useNavigate();

  const [user,setUser]=useState<Peer>();
  const [stream,setStream]=useState<MediaStream>();

    const fetchUserFeed=async()=>{
     const stream= await navigator.mediaDevices.getUserMedia({video:true,audio:true})
     setStream(stream);
    }
  
 


  useEffect(()=>{
    const userId=v4();
    const newPeer=new Peer(userId,{
      host:"localhost",
      port:9000,
      path:"/myapp"
    });
    setUser(newPeer);
    fetchUserFeed()

   const enterRoom=({roomId}:{roomId:string})=>{
    navigate(`/room/${roomId}`);
   }

   socket.on("room-created",enterRoom);
  
  },[])

 return (
  <SocketContext.Provider value={{socket,user,stream}}>
   {children}
  </SocketContext.Provider>
 )
}
import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContex";


const CreateRoom:React.FC=()=>{

 const {socket}=useContext(SocketContext);
 
 const initRoom=()=>{
  socket.emit("create-room");

 }

 return <button className=" btn  btn-success p-2  text-black" onClick={initRoom}>
  Start a new meeting in a room
 </button>
 
}


export default CreateRoom;
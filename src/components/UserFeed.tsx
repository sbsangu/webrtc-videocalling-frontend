import { useEffect, useRef } from "react";

const UserFeed:React.FC<{stream?:MediaStream}>=({stream})=>{

 const videoRef=useRef<HTMLVideoElement>(null);

 useEffect(() => {
  if(videoRef.current && stream){
   videoRef.current.srcObject=stream;
  }
 
 
 }, [stream])
 

 return(
  <>
  <video muted style={{width:"300px",height:"200px"}} autoPlay={true} ref={videoRef}
  >

  </video>
  </>
 )

}


export default UserFeed;
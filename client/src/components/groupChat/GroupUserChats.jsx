import { useContext } from "react"
import { GroupContext } from "../../context/groupChatContext"
import People from "./People";

export default function GroupUserChats() {
    const  {userChats, user, members} = useContext(GroupContext);
    console.log("members :", members)

  return (
    <div style={{
      display: "flex",
      flexDirection : 'column',
      cursor :'pointer',
      
    }}>{
        userChats && userChats?.map((elem, i) =>{ 
            return <People elem = {elem} user= {user} key={i}  />
          })
    
    }
        </div>
  )
}

import { useContext } from "react";
import { GroupContext } from "../../context/groupChatContext";

const GroupChats = ({setIsOpen,open}) => {
  const {groupChats} = useContext(GroupContext);
  console.log("in the groupChats " ,Array.isArray(groupChats))
    return ( <div style={{
        flexGrow : "2",
        flexShrink : "2",
        position : "relative",
     
        

    }}>
        <div style={{
          display : "flex",
          flexDirection : "column",
          gap : '0.5rem',
      
        }}>
        {
          groupChats && groupChats.map((elem, index) =>{
            return <div style={{
            background : "grey" ,
            padding : '3px'
            }} key={index}>{elem?.name} </div>
          })
        }

        </div>
       
       



    </div> );
}
 
export default GroupChats;




import { useContext, useState } from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import { GroupContext } from "../../context/groupChatContext";
import avatar from '../../assets/avatar.svg'
import { deleteMember } from "../../functions/dellete,";
import { ChatContext } from "../../context/chatContext";
export default function People({elem, user}) {
  
  const {setMembers, members, searchQuery} = useContext(GroupContext);
 const {recipientUser} = useFetchRecipientUser(elem,user);
 
  return (
    <div 
    onClick={() => {
        deleteMember(members,setMembers,recipientUser?.user?._id);
      if(members.indexOf(recipientUser) === -1){
        setMembers(mem => [...mem, recipientUser]);
      }
    }}
    className="people"
     style={{
      padding : '0.5rem',
      borderRadius  : '5px',
      cursor : 'pointer',
      display :'flex',
      flexDirection: 'row',
      gap : '1rem',
      justifyContent : 'space-between',
      alignItems : "center"
    }} >
      <div style={{
        display :'flex',
        flexDirection: 'row',
        gap : '1rem',
      }}>
      <img src={avatar} alt='avatar' height='40px' />
      <span>{recipientUser?.user?.name}</span>
      </div>
        <svg 
       
        style={{ borderRadius: '4px' }}
        xmlns="http://www.w3.org/2000/svg" width="20" height="20"   fill='currentColor' className="bi bi-square" viewBox="0 0 16 16">
            <rect width="16" height="16" fill={members.indexOf(recipientUser) !== -1 ? '#16FF00' : 'transparent'} />
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            {members.indexOf(recipientUser) !== -1 && (
        <path
          fill="none"
          stroke="black"
          strokeWidth="1"
          d="M4 7.5l3 3 7-7"
        />
      )}
</svg>

    </div>
  )
}

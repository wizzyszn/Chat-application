import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/chatContext'
import { baseUrl, getRequest, postRequest } from '../utils/services'
export const GroupContext = createContext()
const GroupChatContext = ({ children, user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [members, setMembers] = useState([])
  const { userChats } = useContext(ChatContext)
  const [groupUrl, setGroupUrl] = useState()
  const [groupChats, setGroupChats] = useState([])
  const [groupName, setGroupName ]= useState('');
  const allMembers = members.map(mem => mem.user._id);
  const [ groupChatError ,setGroupChatError] = useState(null);
  const [searchQuery , setSearchQuery] = useState('');
  const handleFileChange = useCallback(event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (e) {
        setGroupUrl(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])
  const handleSearchChange = (e) =>{
    setSearchQuery(e.target.value);
  }

  const handleOnchange = useCallback(e => {
    setGroupName(e.target.value);
  }, []);
  
  const handleSubmit = useCallback(async () => {
    console.log('all details', {
      AdminId: user?._id,
      name: groupName,
      membersId: allMembers
    });
    const groupChat = await postRequest(
      `${baseUrl}/groups`,
      JSON.stringify({
        AdminId: user?._id, 
        membersId: allMembers,
        name : groupName
      })
    );
    console.log("response from groupChat : ", groupChat);
    if(groupChat && !groupChat?.error){
    setGroupChats(mem => [...mem ,groupChat]);
    setIsOpen(!isOpen);
    setGroupName('');
    setMembers([])
    }else if(groupChat?.error){
      setGroupChatError(groupChat.message);
    }
  }
, [allMembers,groupName,user,isOpen]);

//fetch groups
useEffect(()=>{
 async function makeRequest(){
  const response = await getRequest(`${baseUrl}/groups/${user?._id}`);
  console.log("This is the response : ", response?.error)
  if(!response.error){
    setGroupChats(response) 
  }
  }
  makeRequest();
  

}, [user])
console.log("These are the groupChats : ", groupChats)  
  return (
    <GroupContext.Provider
      value={{
        isOpen,
        setIsOpen,
        userChats,
        user,
        members,
        setMembers,
        handleFileChange,
        groupUrl,
        handleOnchange,
        handleSubmit,
        groupChats,
        groupChatError,
        setGroupName,
        setSearchQuery,
        searchQuery,
        handleSearchChange,
        
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}

export default GroupChatContext

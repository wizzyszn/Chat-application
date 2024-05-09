import ReactDOM from 'react-dom'
import GroupUserChats from '../GroupUserChats'
import SelectedUsers from '../SelectedUsers'
import { useContext, useState } from 'react'
import { GroupContext } from '../../../context/groupChatContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchRecipientUser } from '../../../hooks/useFetchRecipient'
import People from '../People'
import { ChatContext } from '../../../context/chatContext'

const modalStyle = {
  position: 'fixed',
  background: '	#0C0C0C',
  zIndex: 1000,
  width: '20rem',
  top: '10%',
  right: '2%',
  borderRadius: '5px',
  height: '35rem',
  overflow :'auto',

}
export default function GroupChatModal ({ open }) {

  const {
    groupUrl,
    handleFileChange,
    members,
    handleOnchange,
    handleSubmit,
    groupChats,
    setMembers,
    setGroupName,
    groupChatError,
    userChats,
    user,
    handleSearchChange
  } = useContext(GroupContext);
  const {groupUserChats,setGroupUserChats} = useContext(ChatContext)

  
  
  if (!open) return null;

  return ReactDOM.createPortal(
    <div translate='('
    className='scroll'
    style={modalStyle}>
     <div style={{
        position : 'relative',
        height : '100%',
        width :'100%'
       
      }}>
        <div style={{
          position :'sticky',
          width : '100%',
          top : '0',
          zIndex  : 1001,
          background: 'rgba(0,0,0)',
          padding : '1rem 1rem 0 1rem',
    
          

        }}>
          <h4 style={{ textAlign: 'center' }}>New Group</h4>
  <input
  onChange={(e) =>{
    handleSearchChange(e)

  }}
    placeholder='Search'
    style={{
      width: '100%',
      borderBottom: '2px solid green',
      borderRadius: '5px',
      background: '#252422',
      border: 'none',
      color: 'white'
    }}
    type='text'
    name=''
    id=''
 /> 
 {
  members && (<SelectedUsers />)
 }
  <p style={{ fontSize : '0.9em', marginBottom : 0,  paddingTop :"0.5rem"}}>All Contacts</p>
        </div>
        <div style={{
          display : 'flex',
          justifyContent :'center',
          gap : '0.2rem',
          flexDirection : 'column',
          padding : "1rem"

        }}>
          {
     groupUserChats && groupUserChats.map((elem, index) =>{
        return <People key={index} elem = {elem} user = {user}/>
      })
    }


        </div>
      </div>

    </div>,
    document.getElementById('portal')
  )
}
  

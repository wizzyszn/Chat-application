import { Stack } from 'react-bootstrap'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import avatar from '../../assets/avatar.svg'
import { ChatContext } from '../../context/chatContext'
import { useContext } from 'react'
import { unreadNotificationsFunc } from '../../utils/unreadNotifications'
import moment from 'moment'
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage'
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user)
  const {latestMessage} = useFetchLatestMessage(chat)
  const { onlineUsers, userChats, notifications, markThisUserNotification} = useContext(ChatContext)
  const isOnline = onlineUsers?.some(user => {
    return user?.userId === recipientUser?.user?._id
  })
  const unreadNotifications = unreadNotificationsFunc(notifications)
  const thisUserNotifications = unreadNotifications?.filter(n => {
    return n.senderId == recipientUser?.user?._id
  });
  const lastMessage = latestMessage?.text
  let message;
  const subString = (text) =>{
    if(text?.length > 20){
      message = text?.substring(0,20) + "......."
      return message
    }else{
      return text;
    }
   

  }
  return (
    userChats && (
      <Stack
        direction='horizontal'
        gap={3}
        className='user-card align-items-center p-2 justify-content-between'
        role='button'
        onClick={() =>{
            if(thisUserNotifications?.length !== 0){
                markThisUserNotification(thisUserNotifications,notifications)

            }
           

        }}
      >
        <div className='d-flex'>
          <div className='me-2'>
            <img src={avatar} alt='avatar' height='40px' />
          </div>
          <div className='text-content'>
            <div className='name'>
              {recipientUser?.user.name}
            </div>{
              latestMessage?.length !== 0 &&  <div className='text'>{subString(lastMessage)}</div>
            }
             
                   
                
                  </div>
        </div>
        <div className='d-flex flex-column-reverse align-items-end'>
          {
            latestMessage?.length !== 0  &&
            <div className='date'>
              {moment(latestMessage?.createdAt).calendar()}
            </div>
          }

          <div
            className={
              thisUserNotifications?.length > 0 ? 'this-user-notifications' : ''
            }
          >
            {thisUserNotifications?.length > 0
              ? thisUserNotifications.length
              : ''}
          </div>

          <span className={isOnline ? 'user-online' : ''}> </span>
        </div>
      </Stack>
    )
  )
}

export default UserChat

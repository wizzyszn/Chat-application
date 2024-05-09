import  {createContext, useCallback, useContext, useEffect, useState} from "react";
import  { getRequest, baseUrl, postRequest }  from "../utils/services"
import {io} from "socket.io-client"
export const ChatContext = createContext()

export const ChatContextProvider = ({children, user}) =>{
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading , setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError,  setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage ,  setNewMessage] = useState(null)
    const [socket ,  setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications , setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [groupUserChats,setGroupUserChats] = useState([])

    console.log("notifications", notifications)

    //initialize socket 
    useEffect(() =>{
        //this is used to create a new Socket.IO client
        //this invocation returns a socket object which represents the Websocket connection between the client and the server
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        }
    }, [user]);
    //add online users

    useEffect(() =>{
        if(socket === null){
            return
        }
        socket.emit("addNewUser", user?._id, user?.name);
        socket.on("getOnlineUsers" , (res) =>{
            setOnlineUsers(res)

        })
        return ()=>{
            socket.off("getOnlineUsers");


        }


    } , [socket, user])
    //send message
    useEffect(() =>{
        if(socket === null) return
       
        const recipientId = currentChat?.members?.filter((chat) =>{
            return chat !== user?._id
        })
        socket.emit("sendMessages",{
            ...newMessage,
            recipientId
        });

    
 
    }, [newMessage]);// eslint-disable-line



    //recieve message and notification
    useEffect(() =>{
        if(socket === null)  return;
        socket.on("getMessages" , (res)=>{
            console.log("currentChat id :", currentChat?._id )
            if(currentChat?._id !== res.chatId) return
            setMessages((prev) => {
                return [...prev , res]    
            });

        });
        socket.on("getNotification", (res) =>{
          const isChatOpen =  currentChat?.members?.some((id) => id === res.senderId);
          if(isChatOpen){
            setNotifications(prev => [{...res, isRead : true}, ...prev]);
          }else{ 
            setNotifications(prev => [res, ...prev]);
          }
        })
        return () =>{
            socket.off("getMessages");
            socket.off('getNotification');
        }
    }, [socket,currentChat]);
    // get user chats
    useEffect( () =>{
        const getUserChats = async () =>{
            if(user?._id){
                setIsUserChatsLoading(true);
                setUserChatsError(null)
                const response = await getRequest(`${baseUrl}/chat/${user?._id}`)
                console.log(response)
                setIsUserChatsLoading(false)
                if(response.error){ 
                    return setUserChatsError(response)
                }
                setUserChats(response);
                setGroupUserChats(response)
            }

        }
        getUserChats()

    }, [user,notifications]);

    useEffect(()=>{
        const getUsers = async () =>{
            const {users} = await getRequest(`${baseUrl}/users/${user?._id}`);
            if(users.error){
                return console.log("Error fetching all users....." , users);
                
            }
            const pChats = users.filter((u)=> {
               const userId = u._id;
                const isChatCreated = userChats.some((chat) =>{
                    const memberIds = chat.members.map((member) => member);
                    return memberIds.includes(userId)
                }) 
               return !isChatCreated;
            });
            console.log("Potential Chats " ,pChats)
            setPotentialChats(pChats);
            setAllUsers(users)  
        }
        getUsers()

    }, [userChats, user]);

    //fetch messages 
    useEffect(() => {
        const getMessages = async () =>{
            setIsMessagesLoading(true);
            setMessagesError(null);
            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
            setIsMessagesLoading(false);
            if(response.error){
              return  setMessagesError(response);
            }
                
            setMessages(response)
        }
        getMessages()
    }

    , [currentChat]);
    const sendTextMessage = useCallback( async (textMessage, sender, currentChatId, setTextMessage) => {
        if(!textMessage){
            return console.log("You must type something.....");
        }
       const response = await postRequest(`${baseUrl}/messages` , JSON.stringify({
            senderId : sender._id,
            chatId : currentChatId,
            text : textMessage
        }))     
if(response.error){
    return setSendTextMessageError(response);

}

setNewMessage(response);
setMessages((prevMsg) => [...prevMsg , response])
setTextMessage(""); 

    }, [])
    console.log("these are the : ", messages)
    const updateCurrentChat  = useCallback((chat)=>{
        setCurrentChat(chat)
    },[])
    const createChat = useCallback(async (firstId,secondId) =>{ 
        const response  = await postRequest(`${baseUrl}/chat`,JSON.stringify({
            firstId,secondId
        }) )
        if(response.error){
            return console.log("Error creating chat", response)
        }
        setUserChats(prevChat => [...prevChat ,response])
    }, []);

    const markAllNotificationsAsRead = useCallback((notifications) =>{
        const mNotifications = notifications.map((n) =>{
            return {
                ...n,
                isRead : true
            }
        });
        setNotifications(mNotifications)

    }, []);

    const markNotificationAsRead = useCallback((n,userChats, user, notifications) =>{
        //find chat to open
        console.log("n : " , n )
        console.log("userchats  : " , userChats );
        console.log("user  : " , user );
        console.log("notification: " , notifications);
        const chatMembers = [user._id, n.senderId]
        const desiredChat = userChats.find((chat) => {
            const isDesiredChat = chat?.members.every((member) =>{
                return chatMembers.includes(member);
            });
            
            return isDesiredChat;
        });
        console.log(desiredChat)
        // mark notification as read
        const mNotifications = notifications.map((el) =>{
            if(n.senderId === el.senderId){
                return {
                    ...n,
                    isRead : true
                }
            }else{
                return el
            }
        });

        setCurrentChat(desiredChat);
        setNotifications(mNotifications);
    }, []);

    const markThisUserNotification =  useCallback((thisUserNotifications,notificaitons) =>{
        const mNotification = notificaitons.map((el) =>{
            let notification;
            thisUserNotifications.forEach(n =>{
                if(n.senderId === el.senderId){
                    notification = {
                        ...n,
                        isRead : true
                    }
                }else{
                    notification = el
                }

            });
            return notification
            
        })
        setNotifications(mNotification)

    }, [])

    /*const observerIntersector = useCallback((parent,child, overflow) =>{
    const options = {
        root: parent
    }
    const callback = (entries) =>{
        entries.forEach((entry) =>{
            console.log(entry.isIntersecting)
            if(overflow && !entry.isIntersecting){
                parent.scrollTop = parent.scrollHeight
                console.log(entry.scrollTop)
                observer.unobserve(child)
            }

        })
        
    }
    const observer = new IntersectionObserver(callback,options)
    observer.observe(child)

}, []) */
    return <ChatContext.Provider value={{
        userChats , 
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        currentChat,
        sendTextMessage,    
        onlineUsers,
        notifications,  
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        setNotifications,
        markThisUserNotification,
        setGroupUserChats,
        groupUserChats
       

    }}>
        {children}
    </ChatContext.Provider>

}
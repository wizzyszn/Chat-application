import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

function Chat() {
    const {user} = useContext(AuthContext)
    const {userChats, isUSerChatsLoading, updateCurrentChat} = useContext(ChatContext);
    return ( user && <Container>
        <PotentialChats user ={user}/>
        {
            userChats?.length < 1 ? null : <Stack direction="horizontal" gap={4} className="align-items-start">
                <Stack className="flex-grow-0 messages-box pe-3" gap={3} style={{
                    scrollbarWidth : 'thin',
                    scrollbarColor: 'black',
                }}  >
                    {
                        isUSerChatsLoading && <p>Loading chats ....</p>
                    }
                    {
                        userChats.map((chat ,index) => {
                            return <div key={index} onClick={() => {updateCurrentChat(chat)}}>
                                <UserChat  chat = {chat} user = {user}/>
                            </div>
                        })  
                    }
                </Stack>
                <ChatBox />
            </Stack>
        }

             </Container>);
}

export default Chat;
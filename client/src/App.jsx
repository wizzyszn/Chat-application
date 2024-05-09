import {Route,Routes, Navigate, BrowserRouter} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/Register'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import Navbar from './components/NavBar'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { ChatContextProvider } from './context/chatContext'
import Group from './components/groupChat/Group'
import GroupChatContext from './context/groupChatContext'
function App() {
  const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
      <GroupChatContext user ={user}>

     
    <BrowserRouter>
    <Navbar />
    <Container>
    <Routes>
      <Route path='/'  element={user ? <Chat />: <Login />}/>
      <Route path='/login'  element={user ? <Chat /> : <Login/>}/>
      <Route path='/register'  element={user ? <Chat /> : <Register />}/>
      <Route path='/groups'  element={<Group />}/>
      <Route path='*'  element={<Navigate to='/'/>}/>
    
    </Routes>
    </Container>
    </BrowserRouter>
    </GroupChatContext>
    </ChatContextProvider>
  )
}

export default App

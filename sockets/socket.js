const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer()
let onlineUsers = []
const io = new Server(server, {
  cors: 'http://localhost:5173'
})
io.on('connection', (socket) => {
  console.log('new connection on : ', socket.id)

  //listen to a connection
  socket.on('addNewUser', (userId, name) => {
    !onlineUsers.some(user => {
      return user.userId === userId
    }) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
        name
      })
    console.log('onLineUsers: ', onlineUsers)
    io.emit('getOnlineUsers', onlineUsers)
  });
  //add message
  socket.on("sendMessages", (message) =>{
    const user = onlineUsers.find(user => {
      return user.userId === message.recipientId[0]
    });
    console.log("message : " ,message);
    if(user){
      io.to(user.socketId).emit("getMessages", message)
      io.to(user.socketId).emit('getNotification',{
        senderId : message.senderId,
        isRead : false,
        date : new Date(),
        message : message.text
      })
    }

  })
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => {
      return user.socketId !== socket.id
    })
    io.emit('getOnlineUsers', onlineUsers)
  });
})  
io.listen(3000);
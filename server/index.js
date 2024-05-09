const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes')
const messageRoute = require('./routes/messageRoutes')
const groupChatRoute = require('./routes/groupChatRoutes');
const groupChatMessageRoute = require('./routes/groupMessagesRoutes')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors({origin : '*'}))
app.use('/api/users', userRoute)
app.use('/api/chat', chatRoute)
app.use('/api/messages',messageRoute )
app.use('/api/groups', groupChatRoute);
app.use('/api/groups/message',groupChatMessageRoute );
// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Bad JSON syntax
      return res.status(400).json({ error: 'Bad JSON syntax' });
    }
    next();
  });
  
mongoose.connect(process.env.MONGODB_URL, {
 useNewUrlParser  : true,
 useUnifiedTopology : true
}).then(() =>{
    app.listen(process.env.PORT || 3000, (req,res) =>{
        console.log(`connected to database and server runnning on port ${process.env.PORT}`)
    
    })
}).catch((error) =>{
console.log("MonogDB connection failed : ", error.message)
});

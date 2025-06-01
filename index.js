const cors = require('cors');
const express = require('express');
const app = express()
const connectDB = require('./db/db');

const start = async () => {
  app.use(express.json());
  await connectDB();

  app.use(cors());

  const userRouter = require('./routes/userRoutes');
  const adminRouter = require('./routes/adminRoutes');

  app.use("/api/user/", userRouter)
  app.use("/api/admin/", adminRouter)






  app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running on port 3001");
  })
}
start()
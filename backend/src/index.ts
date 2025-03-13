import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Cấu hình CORS để cho phép yêu cầu từ localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',  // Cho phép frontend trên localhost:3000
  methods: ['GET', 'POST'],         // Cho phép các phương thức GET và POST
  allowedHeaders: ['Content-Type'], // Cho phép các header cần thiết
};

// Sử dụng middleware CORS
app.use(cors(corsOptions));

// Sử dụng JSON parser cho body
app.use(express.json());

// Đăng ký route
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

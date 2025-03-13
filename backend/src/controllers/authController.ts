import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

// Đăng ký người dùng
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { full_name, email, password } = req.body;

  try {
    // Kiểm tra xem email có bị trùng không
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      res.status(400).json({ message: 'Email đã tồn tại' });
      return;
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Thêm người dùng mới vào cơ sở dữ liệu
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [full_name, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // Tạo token JWT
    const token = jwt.sign({ id: newUser.id, full_name: newUser.full_name }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    // Trả về thông tin người dùng và token
    res.status(201).json({ message: 'Đăng ký thành công', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi server');
  }
};
// Đăng nhập người dùng
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
      const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = userResult.rows[0];
  
      if (!user) {
        res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
        return;
      }
  
      // So sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
        return;
      }
  
      // Tạo token JWT sau khi đăng nhập thành công
      const token = jwt.sign({ id: user.id, full_name: user.full_name }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      // Trả về thông tin người dùng và token
      res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Lỗi server');
    }
  };
  
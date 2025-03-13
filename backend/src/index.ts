import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db"; // Giả sử bạn có tệp db.ts để kết nối với cơ sở dữ liệu

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT NOW()"); // Kiểu trả về từ DB là { rows: { now: string }[] }
    res.json({ message: "Server running", time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ message: "Error connecting to DB", error: error instanceof Error ? error.message : error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

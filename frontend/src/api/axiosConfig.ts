import axios from 'axios';

// Cấu hình axios với baseURL và headers mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Cấu hình base URL của API
  headers: {
    'Content-Type': 'application/json', // Đảm bảo API nhận dữ liệu dạng JSON
  },
});

// Hàm để thêm JWT token vào headers (nếu có)
const setAuthToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers['Authorization'];
  }
};

// Cấu hình các phương thức gọi API chung
const api = {
  // Đăng nhập
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  // Đăng ký
  register: async (full_name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        full_name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  // Lấy danh sách người dùng
  getUsers: async () => {
    try {
      const response = await axiosInstance.get('/auth/users');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  // Lấy thông tin người dùng theo ID
  getUserById: async (id: number) => {
    try {
      const response = await axiosInstance.get(`/auth/users/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id: number, full_name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.put(`/auth/users/${id}`, {
        full_name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },

  // Xóa người dùng
  deleteUser: async (id: number) => {
    try {
      await axiosInstance.delete(`/auth/users/${id}`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
  },
};

export { axiosInstance, setAuthToken, api };

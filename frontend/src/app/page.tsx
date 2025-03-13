"use client";
import React, { useState, useEffect } from "react";
import { api } from "@/api/axiosConfig"; // Sử dụng Axios config của bạn
import { UserList } from "@/components/UserList"; // Sửa từ CustomerList thành UserList
import { UserForm } from "@/components/UserForm"; // Sửa từ CustomerForm thành UserForm
import { Button } from "@/components/ui/button";

export default function Home(){
  const [users, setUsers] = useState<any[]>([]); // Sửa từ customers thành users
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Sửa từ selectedCustomer thành selectedUser

  // Hàm mở/đóng modal
  const handleOpenModal = (user: any = null) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const data = await api.getUsers(); // API lấy danh sách người dùng
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchUsers(); // Lấy danh sách người dùng khi component mount
  }, []);

  return (<div>
      <Button variant="default" onClick={() => handleOpenModal()}>
        Thêm người dùng
      </Button>
      <UserList users={users} onEdit={handleOpenModal} onDelete={fetchUsers} /> {/* Sửa CustomerList thành UserList */}

          <UserForm user={selectedUser} onClose={handleCloseModal} onSuccess={fetchUsers} /> {/* Sửa CustomerForm thành UserForm */}

  </div>

  );
};


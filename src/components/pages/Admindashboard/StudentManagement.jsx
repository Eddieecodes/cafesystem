import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import Button from "../ui/Buttonn";
import Input from "../ui/Input";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentManagement.css"; // Import the CSS file for responsive styles

// Section: Student Management
const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    matricNumber: "",
    department: "",
    mealPlan: "",
  });
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(`${config.BASE_URL}/feedback/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        toast.error("Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      await axios.delete(`${config.BASE_URL}/feedback/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const response = await axios.put(
        `${config.BASE_URL}/admin/students/${editStudent._id}`,
        editStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(
        students.map((student) =>
          student._id === editStudent._id ? editStudent : student
        )
      );
      setIsModalOpen(false);
      setEditStudent(null);
      toast.success("Student updated successfully!");
    } catch (error) {
      toast.error("Failed to update student.");
    }
  };

  const handleAddStudent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    if (
      !newStudent.name ||
      !newStudent.email ||
      !newStudent.matricNumber ||
      !newStudent.department ||
      !newStudent.mealPlan
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        `${config.BASE_URL}/feedback/students`,
        newStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents([...students, response.data.student]);
      setIsModalOpen(false);
      setNewStudent({
        name: "",
        email: "",
        matricNumber: "",
        department: "",
        mealPlan: "",
      });
      toast.success("Student added successfully!");
    } catch (error) {
      toast.error("Failed to add student.");
    }
  };

  return (
    <div className="student-management-container">
      <div className="header">
        <Input
          type="text"
          placeholder="Filter students..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)} className="addstudent">
          <Plus size={16} /> Add Student
        </Button>
      </div>

      <Table
        headers={[
          "Name",
          "Email",
          "Matric No",
          "Department",
          "Meal Plan",
          "Actions",
        ]}
        data={students.filter(
          (s) =>
            s.name.toLowerCase().includes(filter.toLowerCase()) ||
            s.department.toLowerCase().includes(filter.toLowerCase()) ||
            s.matricNumber.toLowerCase().includes(filter.toLowerCase())
        )}
        renderRow={(student) => (
          <>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.matricNumber}</td>
            <td>{student.department}</td>
            <td>{student.mealPlan}</td>
            <td>
              <Button onClick={() => handleEdit(student)}>
                <Edit size={16} />
              </Button>
              <Button onClick={() => handleDelete(student._id)}>
                <Trash2 size={16} />
              </Button>
            </td>
          </>
        )}
      />

      {/* Add/Edit Student Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{editStudent ? "Edit Student" : "Add Student"}</h2>
        <Input
          placeholder="Name"
          value={editStudent ? editStudent.name : newStudent.name}
          onChange={(e) =>
            editStudent
              ? setEditStudent({ ...editStudent, name: e.target.value })
              : setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <Input
          type="email"
          placeholder="Email"
          value={editStudent ? editStudent.email : newStudent.email}
          onChange={(e) =>
            editStudent
              ? setEditStudent({ ...editStudent, email: e.target.value })
              : setNewStudent({ ...newStudent, email: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Matric No"
          value={editStudent ? editStudent.matricNumber : newStudent.matricNumber}
          onChange={(e) =>
            editStudent
              ? setEditStudent({ ...editStudent, matricNumber: e.target.value })
              : setNewStudent({ ...newStudent, matricNumber: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Department"
          value={editStudent ? editStudent.department : newStudent.department}
          onChange={(e) =>
            editStudent
              ? setEditStudent({ ...editStudent, department: e.target.value })
              : setNewStudent({ ...newStudent, department: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            editStudent
              ? setEditStudent({ ...editStudent, mealPlan: e.target.value })
              : setNewStudent({ ...newStudent, mealPlan: e.target.value })
          }
          value={editStudent ? editStudent.mealPlan : newStudent.mealPlan || ""}
          style={{ padding: "10px", width: "100%", margin: "10px 0" }}
        >
          <option value="" disabled>
            Select Meal Plan
          </option>
          <option value="LS">Lunch and Supper</option>
          <option value="BLS">Breakfast, lunch and Supper</option>
          <option value="BS">Breakfast and Supper</option>
        </select>
        <Button onClick={editStudent ? handleSaveEdit : handleAddStudent}>
          Save
        </Button>
      </Modal>

      {/* User Management Section */}
      <UserManagement />
    </div>
  );
};

// Section: User Management
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    studentDetails: { matricNumber: "", department: "", mealPlan: "" },
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(`${config.BASE_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      await axios.delete(`${config.BASE_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const response = await axios.put(
        `${config.BASE_URL}/admin/users/${editUser._id}`,
        editUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === editUser._id ? editUser : user
        )
      );
      setIsModalOpen(false);
      setEditUser(null);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  const handleAddUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/admin/users`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data.user]);
      setIsModalOpen(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "student",
        studentDetails: { matricNumber: "", department: "", mealPlan: "" },
      });
      toast.success("User added successfully!");
    } catch (error) {
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="user-management-container">
      <div className="header">
        <Input
          type="text"
          placeholder="Filter users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)} className="adduser">
          <Plus size={16} /> Add User
        </Button>
      </div>

      <Table
        headers={["Name", "Email", "Role", "Matric No", "Department", "Meal Plan", "Actions"]}
        data={users.filter((u) =>
          u.name.toLowerCase().includes(filter.toLowerCase()) || 
          u.email.toLowerCase().includes(filter.toLowerCase()) ||
          (u.studentDetails?.department || "").toLowerCase().includes(filter.toLowerCase())
        )}
        renderRow={(user) => (
          <>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.studentDetails?.matricNumber || ""}</td>
            <td>{user.studentDetails?.department || ""}</td>
            <td>{user.studentDetails?.mealPlan || ""}</td>
            <td>
              <Button onClick={() => handleEdit(user)}>
                <Edit size={16} />
              </Button>
              <Button onClick={() => handleDelete(user._id)}>
                <Trash2 size={16} />
              </Button>
            </td>
          </>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>{editUser ? "Edit User" : "Add User"}</h2>
        <Input
          placeholder="Name"
          value={editUser ? editUser.name : newUser.name}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <Input
          type="email"
          placeholder="Email"
          value={editUser ? editUser.email : newUser.email}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <select
          value={editUser ? editUser.role : newUser.role}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })
          }
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <Input
          type="text"
          placeholder="Matric No"
          value={editUser ? editUser.studentDetails.matricNumber : newUser.studentDetails.matricNumber}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, studentDetails: { ...editUser.studentDetails, matricNumber: e.target.value } })
              : setNewUser({ ...newUser, studentDetails: { ...newUser.studentDetails, matricNumber: e.target.value } })
          }
        />
        <Input
          type="text"
          placeholder="Department"
          value={editUser ? editUser.studentDetails.department : newUser.studentDetails.department}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, studentDetails: { ...editUser.studentDetails, department: e.target.value } })
              : setNewUser({ ...newUser, studentDetails: { ...newUser.studentDetails, department: e.target.value } })
          }
        />
        <select
          value={editUser ? editUser.studentDetails.mealPlan : newUser.studentDetails.mealPlan}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, studentDetails: { ...editUser.studentDetails, mealPlan: e.target.value } })
              : setNewUser({ ...newUser, studentDetails: { ...newUser.studentDetails, mealPlan: e.target.value } })
          }
        >
          <option value="">None</option>
          <option value="LS">Lunch and Supper</option>
          <option value="BLS">Breakfast and Lunch</option>
          <option value="BS">Breakfast and Supper</option>
        </select>
        <Button onClick={editUser ? handleSaveEdit : handleAddUser}>
          Save
        </Button>
      </Modal>
    </div>
  );
};

export default StudentManagement;

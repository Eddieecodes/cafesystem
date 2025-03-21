import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import Button from "../ui/Buttonn";
import Input from "../ui/Input";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import { Edit, Trash2, Plus } from "lucide-react";
import "./StudentManagement.css";
import { toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  


const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", matricNumber: "", department: "", mealPlan: "" });

  useEffect(() => {
    // Fetch students from backend
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Unauthorized');
        return;
      }

      try {
        const response = await axios.get(`${config.BASE_URL}/feedback/students`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudents(response.data);
      } catch (error) {
        toast.error('Failed to fetch students.');
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized');
      return;
    }

    try {
      await axios.delete(`${config.BASE_URL}/feedback/students/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      toast.error('Failed to delete student.');
    }
  };

  const handleEdit = async (id, key, value) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized');
      return;
    }

    try {
      const response = await axios.put(`${config.BASE_URL}/feedback/students/${id}`, { [key]: value }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents(students.map(student => student._id === id ? response.data.student : student));
    } catch (error) {
      toast.error('Failed to update student.');
    }
  };

  const handleAddStudent = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Unauthorized');
      return;
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/feedback/students`, newStudent, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudents([...students, response.data.student]);
      setIsModalOpen(false);
      setNewStudent({ name: "", email: "", matricNumber: "", department: "", mealPlan: "" });
    } catch (error) {
      toast.error('Failed to add student.');
    }
  };

  return (
    <div className= "student-management-container">
      <div className= "header">
        <Input
          type="text"
          placeholder="Filter students..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={() => setIsModalOpen(true)} className="addstudent"><Plus size={16} /> Add Student</Button>
      </div>

      <Table
        headers={["Name", "Email", "Matric No", "Department", "Meal Plan", "Actions"]}
        data={students.filter(s => s.name.includes(filter) || s.department.includes(filter))}
        renderRow={(student) => (
          <>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student._id, "name", e.currentTarget.textContent)}
            >
              {student.name}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student._id, "email", e.currentTarget.textContent)}
            >
              {student.email}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student._id, "matricNumber", e.currentTarget.textContent)}
            >
              {student.matricNumber}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student._id, "department", e.currentTarget.textContent)}
            >
              {student.department}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student._id, "mealPlan", e.currentTarget.textContent)}
            >
              {student.mealPlan}
            </td>
            <td>
              <Button onClick={() => handleDelete(student._id)}><Trash2 size={16} /></Button>
            </td>
          </>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add Student</h2>
        <Input
          placeholder="Name"
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Matric No"
          onChange={(e) => setNewStudent({ ...newStudent, matricNumber: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Department"
          onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
        />
        <select
          onChange={(e) => setNewStudent({ ...newStudent, mealPlan: e.target.value })}
          value={newStudent.mealPlan || ""}
          style={{ padding: "10px", width: "100%", margin: "10px 0" }}
        >
          <option value="" disabled>Select Meal Plan</option>
          <option value="Lunch and Supper">Lunch and Supper</option>
          <option value="Breakfast and Supper">Breakfast and Supper</option>
          <option value="Breakfast, Lunch, and Supper">Breakfast, Lunch, and Supper</option>
        </select>
        <Button onClick={handleAddStudent}>Save</Button>
      </Modal>
    </div>
  );
};

export default StudentManagement;

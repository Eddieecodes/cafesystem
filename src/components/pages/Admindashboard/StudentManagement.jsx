import React, { useState } from "react";
import Button from "../ui/Buttonn";
import Input from "../ui/Input";
import Table from "../ui/Table";
import Modal from "../ui/Modal";
import { Edit, Trash2, Plus } from "lucide-react";
import "./StudentManagement.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { id: 1, matricNo: "21/3043", level: "400", mealType: "Lunch and Supper", course: "Computer Science", email: "student1@babcock.edu.ng" },
    { id: 2, matricNo: "23/2342", level: "300", mealType: "Breakfast and Dinner", course: "Engineering", email: "student2@babcock.edu.ng" }
  ]);

  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ matricNo: "", level: "", mealType: "", course: "", email: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (id, key, value) => {
    setStudents(students.map(student => student.id === id ? { ...student, [key]: value } : student));
  };

  const handleAddStudent = () => {
    setStudents([...students, { id: Date.now(), ...newStudent }]);
    setIsModalOpen(false);
    setNewStudent({ matricNo: "", level: "", mealType: "", course: "", email: "" });
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
        <Button onClick={() => setIsModalOpen(true)} className="addstudent"><Plus size={16} /> Add Student</Button>
      </div>

      <Table
        headers={["Matric No", "Level", "Meal Type", "Course", "Email", "Actions"]}
        data={students.filter(s => s.matricNo.includes(filter) || s.course.includes(filter))}
        renderRow={(student) => (
          <>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student.id, "matricNo", e.currentTarget.textContent)}
            >
              {student.matricNo}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student.id, "level", e.currentTarget.textContent)}
            >
              {student.level}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student.id, "mealType", e.currentTarget.textContent)}
            >
              {student.mealType}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student.id, "course", e.currentTarget.textContent)}
            >
              {student.course}
            </td>
            <td
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => handleEdit(student.id, "email", e.currentTarget.textContent)}
            >
              {student.email}
            </td>
            <td>
              <Button onClick={() => handleDelete(student.id)}><Trash2 size={16} /></Button>
            </td>
          </>
        )}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add Student</h2>
        <Input
          type="number"
          placeholder="Matric No"
          onChange={(e) => setNewStudent({ ...newStudent, matricNo: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Level"
          onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
        />
        <select
          onChange={(e) => setNewStudent({ ...newStudent, mealType: e.target.value })}
          value={newStudent.mealType || ""}
          style={{ padding: "10px", width: "100%", margin: "10px 0" }}
        >
          <option value="" disabled>Select Meal Type</option>
          <option value="Lunch and Supper">Lunch and Supper</option>
          <option value="Breakfast and Supper">Breakfast and Supper</option>
          <option value="Breakfast, Lunch, and Supper">Breakfast, Lunch, and Supper</option>
        </select>
        <Input
          placeholder="Course"
          onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <Button onClick={handleAddStudent}>Save</Button>
      </Modal>
    </div>
  );
};

export default StudentManagement;

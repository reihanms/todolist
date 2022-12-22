import logo from '../logo.svg';

import FormInput from '../components/FormInput';
import Todoitem from '../components/TodoItem';
import '../App.css';
import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/auth';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import axios from 'axios';
import Button from '../components/Button';
const baseUrl = "https://express-postgress-server-production.up.railway.app/api/v1"

const Task = () => {
  const {logout} = useContext(AuthContext)

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [editData, setEditData] = useState({
    id : "",
    title : ""
  })

  // function open & close modal
  const openModal = (id, data) => {
    setIsEdit(true)
    setEditData({id, title : data})
  }
  
  const openModalDelete = (id,data) => {
    setIsDelete(true)
    setDeleteData({id, title:data})
  }
  const closeModal = () => {
    setIsEdit(false)
  }

  // function delete task
  const deleteTask = id => {
    setTodos(todos.filter(item => item.id !== id))
  }

  // function add task
  const addTask = data => {
    const id = todos.length;
    const newData = {
      id : id + 1,
      title : data
    }
    setTodos([...todos, newData]
    )
  }

  // function edit task
  const setTitle = e => {
    setEditData({
        ...editData,
        title : e.target.value
    })
  }

  const update = () => {
    const {id, title} = editData
    const newData = {id, title}
    const newTodos = todos
    newTodos.splice((id-1), 1, newData); // param 1 data yang akan dihapus, param 2 berapa data yg dihapus, param 3 data baru
    setTodos(newTodos)
    setIsEdit(false)
    setEditData({id : "", title : ""})
  }

  const getData = async() => {
    setLoading(true)
    const token = localStorage.getItem("token")
    const res = await axios.get(`${baseUrl}/todos`,{
      headers : {
        "Authorization" : token,
      }
    })
    setTodos(res.data.data)
    setTimeout(() => {
      setLoading(false)    
    }, 2000);
  }

  useEffect(() => {
    getData()
  }, []);

    return (
      <div className="app">
        <div className='logo'>
          <img src={logo} alt="logo" />
          <h3>Task List</h3>
          <Button text="logout" variant="primary" action={logout} />
        </div>

        <div className='list'>
          {todos.map(item => 
            <Todoitem 
              loading={loading}
              key={item._id} 
              todo={item} 
              del={deleteTask}          
              open={openModal}
              opendelete={openModalDelete} />)}          
        </div>

        <div className='input-form'>
          <FormInput add={addTask} />
        </div>

        <EditModal 
          edit={isEdit} 
          close={closeModal}
          change={setTitle}
          data={editData}
          update ={update}/>

        <DeleteModal
          deletes={isDelete}
          close={closeModal}
          data = {deleteData}
          del = {deleteTask}
          />
      </div>
    );
  }

export default Task;

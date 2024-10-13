import './App.css';
import { useState, useReducer } from 'react';
import reducer, { initTodo } from './reducer/index.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
    const [state, dispatchReducer] = useReducer(reducer, {
        todoList: [],
        todo: { ...initTodo },
    });

    // State cho input (sử dụng useState)
    const [todo, setTodo] = useState(initTodo); 

    // Hàm xử lý khi người dùng nhập dữ liệu vào input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value, 
        }));
    };

    // Hàm xử lý khi bấm nút Save
    const onSave = () => {
        console.log("Todo before save:", todo);
        if (!todo.job) {
            toast.warn("Vui lòng nhập thông tin", {
                position: "top-right",
            });;
            return;
        }
        dispatchReducer({ type: 'todoList/onSave', payload: todo }); // Sử dụng todo thay vì product
        // Reset lại giá trị input
        setTodo(initTodo);
        toast.success("Thêm công việc thành công !", {
            position: "top-right",
          });
       
    };

    const onStatus = (index) => {
        dispatchReducer({
            type: 'todoList/onStatus',
            payload: { index }
        });
        toast.success("Hoàn thành công việc !", {
            position: "top-right",
          });
    };

    
    return (
        <>

            <ToastContainer />
            <h1>Todo Form</h1>
            <input
                type="text"
                name="job" 
                placeholder="Nhập công việc..."
                onChange={handleInputChange}
                value={todo.job} 
            />
            <br />
            <button className='save' onClick={onSave}>Save</button>

            <h2>Todo List</h2>
            <ul>
                {state.todoList.map((todo, index) => (
                    <li 
                        key={index} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            backgroundColor: todo.status ? 'lightgreen' : 'transparent' 
                        }}
                    >
                        {todo.job} 
                        <button 
                            style={{ fontSize: '0.8em', width: '70px' }} 
                            onClick={() => onStatus(index)}
                        >
                            Done
                        </button>
                    </li>
                ))}
            </ul>
        
        </>
    );
}

export default App;


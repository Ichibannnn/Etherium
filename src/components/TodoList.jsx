import React, {useState} from "react";
import TodoItem from "./TodoItem";



const TodoList = () => {
    const [message, setMessage] = useState('');
    const [state, setState] = useState({
        todo: "",
        isUpdate: false,
        todolist: []
    })

    const [edit, setEdit] = useState ({
        editTodo: "",
        index: ""
    })

    const [isUpdate, setIsUpdate] = useState(false)

    //ARRAY DESTRUCTURING
    const { todo, todolist } = state
    const { editTodo,  editIndex} = edit

    //
    const functionOnChange = (e) => {
        const { name, value } = e.target

        setState({...state, [name]: value})
        setMessage(e.target.value);
        console.log("e: ", e.target.value)
    }

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target

        setEdit({...edit, [name]: value})
    }

    const handleOnClickEdit = (index, value) => {
        setIsUpdate(true)
        setEdit({editTodo: value, editIndex: index})
    }

    const handleOnClickCancel = () => {
        setIsUpdate(false)
    }

    // CREATE
    const createTodo = () => {

        if (message.trim().length !== 0) {
            const list = todolist // [] -Current
            list.push(todo)  // [] - Current + Current Todo Input

            setState({todo: "", todolist: list})
          } else {
            alert('Required to add todo list');
          }   
    }

    //DELETE
    const deleteTodo = (index) => {
        const list = todolist // [] -Current
        list.splice(index, 1)  // [] - Current - Index

        setState({todo: "", todolist: list})
    }

    //UPDATE
     const updateTodo = (index) => {
        const list = todolist // [] -Current
        list[index] = editTodo  // [] - Current Upadted Value

        setState({...state, todolist: list})
        setIsUpdate(false)
     }
    

    return (
       
        <div className="todolist-main">
            <h1>To Do List Page</h1>
            <div className="form-wrapper">
                <input 
                type="text" 
                name="todo"
                placeholder="Create todolist"
                value={todo}
                onChange={functionOnChange}                
                />
                <button className="addBtn" onClick={createTodo}>Add</button>
            </div>

            <div className="table-main">
                <div className="header-wrapper ">
                    <span>To Do</span>
                    <span>Action</span>
                </div>

                {
                    todolist.length ?
                        todolist.map((value, index) => (
                            <TodoItem 
                                key={index}
                                index={index}
                                value={value}
                                deleteTodo={deleteTodo}
                                handleOnClickEdit={handleOnClickEdit}
                                
                            />
                        )) : <span>No records found!</span>
                }
                {
                    isUpdate ?

                    <div className="form-wrapper2">
                        <span>Index: {editIndex}</span>
                        <input 
                        type="text" 
                        name="editTodo"
                        placeholder="Update todolist"
                        value={editTodo}
                        onChange={handleOnChangeEdit}
                        />
                        <button onClick={() => updateTodo(editIndex)}>Update</button>
                        <button onClick={handleOnClickCancel}>Cancel</button>
                    </div> : ""
                }
            </div>
        </div>
        
    )
}

export default TodoList
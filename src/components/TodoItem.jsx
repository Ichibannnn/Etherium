import React  from "react";


const TodoItem = props => {
    const {
        index,
        value,
        deleteTodo,
        handleOnClickEdit
    } = props

    return (
        <div className="row-wrapper">
            <span>{value}</span>
            <button onClick={() => handleOnClickEdit(index, value)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
)                         

}

export default TodoItem
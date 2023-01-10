import React from "react";
import { toggleCompletedTodoAsync,deleteTodoAsync } from "../redux/todoSlice";
import { useDispatch } from "react-redux";
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const handleCheckBox = () => {
    dispatch(toggleCompletedTodoAsync({ id: id, completed: !completed }));
  };
  const handleDelete=()=>{
	dispatch(deleteTodoAsync({
		id:id
	}))
  }
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleCheckBox}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

      </div>
    </li>
  );
};

export default TodoItem;

import React from "react";
import classes from "./Todos.module.css";
import TodoItem from "./TodoItem/TodoItem";

const Todos = ({
  data,
  loading,
  setUsers,
  setLoading,
  setUserID,
  setModal,
  test
}) => {
  return (
    <div
      className={
        loading ? [classes.todos, classes.active].join(" ") : classes.todos
      }>
      {loading ? (
        <div
          className="lds-roller"
          style={{
            display: loading ? "inline-block" : "none",
          }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        data.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            setUsers={setUsers}
            setLoading={setLoading}
            setUserID={setUserID}
            setModal={setModal}
            test={test}
          />
        ))
      )}
    </div>
  );
};

export default Todos;

import React from "react";
import classes from "./TodoItem.module.css";
import { MyButton } from "../../UI";
import axios from "axios";
import { BsTrashFill, BsFillPencilFill } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import { NotificationManager } from "react-notifications";

const TodoItem = ({ item, setUsers, setLoading, setUserID, setModal, test }) => {
  const removeUser = async () => {
    try {
      setLoading(true);
      confirmAlert({
        // Confirmation message
        title: "Confirm to Delete",
        message: "Are you sure to delete this user",

        // Confirmation Actions
        buttons: [
          // Yes
          {
            label: "Yes",
            onClick: async () => {
              const res = await axios.delete(
                `http://localhost:5500/users/${item.id}`
              );
              const response = await axios.get("http://localhost:5500/users", {
                _limit: 3,
                _page: 1
              });

              if (res.status === 200) {
                test()
                NotificationManager.success("User has been Deleted", "");
              } else throw new Error("Error!");
            },
          },

          // No
          {
            label: "No",
            onClick: () => NotificationManager.info("Deleting canceled"),
          },
        ],
      });
    } catch (error) {

      NotificationManager.error(
        "Cannot Delete the User Please try again!",
        "",
        5000,
        () => null
      );

      console.log(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.todoItem}>
      <div className={classes.itemInfo}>
        <p className={classes.itemName}>{item.name}</p>
        <p className={classes.itemEmail}>{item.email}</p>
      </div>
      <div className={classes.itemAction}>
        <MyButton
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
            padding: "14px 17px",
          }}
          onClick={() => {
            setUserID(item.id);
            setModal(true);
          }}>
          <BsFillPencilFill />
        </MyButton>
        <MyButton
          data-red="red"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "17px",
            padding: "14px 17px",
          }}
          onClick={removeUser}>
          <BsTrashFill />
        </MyButton>
      </div>
    </div>
  );
};

export default TodoItem;

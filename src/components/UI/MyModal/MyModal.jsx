import React from "react";
import classes from "./MyModal.module.css";

const MyModal = ({ children, modal, setModal }) => {

  React.useEffect(()=> {
    window.addEventListener("keydown", (e)=> {
      if(e.keyCode === 27) {
        setModal(false)
      }
    })
  }, [])

  return (
    <div
      className={
        modal ? [classes.modal, classes.active].join(" ") : classes.modal
      }
      onClick={() => setModal(false)}>
      <div className={classes.modalInner} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;

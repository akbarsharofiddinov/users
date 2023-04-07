import React from "react";
import classes from "./Form.module.css";
import { MyButton, MyInput } from "../UI";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const Form = ({ setUsers, setLoading, setModal, userID, test }) => {
  const [formValue, setFormValue] = React.useState({
    name: "",
    email: "",
  });
  const [errorName, setErrorName] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);

  const { name, email } = formValue;

  const getUser = async (id) => {
    const res = await axios.get(`http://localhost:5500/users/${id}`);
    if (res.status === 200) {
      const { name, email } = res.data;

      setFormValue({
        name,
        email,
      });
    }
  };

  React.useEffect(() => {
    if(userID) {
      getUser(userID)
    }
  }, [userID]);

  const handleName = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const handleEmail = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));

    if (!value) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setErrorEmail(true);
      setErrorName(true);

      NotificationManager.error("Please fill the Form", "", 3000, () => {
        return null;
      });
    }

    if (name && email) {
      // Add new User
      if (!userID) {
        try {
          setLoading(true);
          const res = await axios.post(
            "http://localhost:5500/users",
            { ...formValue },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (res.status === 201) {
            test()
            // setUsers((prev) => [...prev, res.data]);
            setFormValue({
              name: "",
              email: "",
            });
            NotificationManager.success('New User Added Successfully', '');
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setModal(false);
          setLoading(false);
        }
      } else {
        // Edit User
        try {
          setLoading(true)
          const res = await axios.put(`http://localhost:5500/users/${userID}`, {
            ...formValue,
          });
          if(res.status === 200) {
            setUsers(prev => {
              const result = prev.map(item => item.id === res.data.id ? res.data : item);

              return result
            })
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          setModal(false)
          setLoading(false)
        }
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.inputBlock}>
        <MyInput
          type="text"
          placeholder="your name..."
          value={name}
          name="name"
          onChange={handleName}
          style={{
            borderColor: errorName ? "red" : "",
          }}
        />
      </div>
      <div className={classes.inputBlock}>
        <MyInput
          type="email"
          placeholder="your email..."
          value={email}
          name="email"
          onChange={handleEmail}
          style={{
            borderColor: errorEmail ? "red" : "",
          }}
        />
      </div>
      <MyButton>submit</MyButton>
    </form>
  );
};

export default Form;

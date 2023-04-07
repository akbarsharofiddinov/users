import React from "react";
import { Filter, Form, Todos } from "./components";
import { MyModal, MyButton } from "./components/UI";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import { useDebounce } from "./hook/useDebounce";
import returnAllPageCount from "./util/allPageCount";

const App = () => {
  const [users, setUsers] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userID, setUserID] = React.useState(null);
  const [search, setSearch] = React.useState("");

  const querySearch = useDebounce(search);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalUsers, setTotoalUsers] = React.useState(0);

  const getData = async (page, qSearch) => {
    try {
      const res = await axios.get(`http://localhost:5500/users?q=${qSearch}`, {
        params: {
          _limit: 3,
          _page: page,
        },
      });
      setTotoalUsers(+res.headers["x-total-count"]);
      const data = res.data;
      if (res.status === 200) {
        setUsers([...data]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  
  React.useEffect(() => {
    getData(currentPage, querySearch);
    
    console.log(totalUsers)
  }, [currentPage, querySearch, totalUsers]);

  const allPageCount = returnAllPageCount(totalUsers)
  
  return (
    <>
      <section className="section-app">
        <div className="container">
          <MyButton onClick={() => setModal(true)}>add user</MyButton>
          <MyModal modal={modal} setModal={setModal}>
            <Form
              setUsers={setUsers}
              setLoading={setLoading}
              setModal={setModal}
              userID={userID}
              test={()=> getData(currentPage, querySearch)}
            />
          </MyModal>
          <Filter search={search} setSearch={setSearch} />
          <Todos
            data={users}
            loading={loading}
            setUsers={setUsers}
            setLoading={setLoading}
            setUserID={setUserID}
            setModal={setModal}
            test={()=> getData(currentPage, querySearch)}
          />
          <br />
          <div className="paginationBtns">
            {allPageCount.length &&
              allPageCount.map((el, index) => (
                <MyButton
                  key={index}
                  onClick={() => setCurrentPage(el)}
                  style={{
                    padding: "5px 10px",
                  }}>
                  {el}
                </MyButton>
              ))}
          </div>
        </div>
      </section>
      <NotificationContainer />
    </>
  );
};

export default App;

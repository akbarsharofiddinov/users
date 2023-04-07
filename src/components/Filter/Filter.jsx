import React from "react";
import classes from "./Filter.module.css";
import { MyInput } from "../UI";

const Filter = ({search, setSearch}) => {
  

  return (
    <div className={classes.filterBlock}>
      <div className={classes.search}>
        <MyInput
          type="search"
          value={search}
          placeholder="search..."
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </div>
      <div className={classes.sort}>
        <select className={classes.select}>
          <option value="" disabled>
            Sort
          </option>
          <option value="">Name</option>
          <option value="">Email</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;

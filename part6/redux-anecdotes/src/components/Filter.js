import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value.toLowerCase()));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange}></input>
    </div>
  );
};

export default Filter;

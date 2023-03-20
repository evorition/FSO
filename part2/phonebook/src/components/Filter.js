const Filter = ({ value, handler }) => (
  <div>
    filter shown with
    <input value={value} onChange={({ target }) => handler(target.value)} />
  </div>
);

export default Filter;

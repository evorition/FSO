const Notification = ({ message, errorClassName }) => {
  if (message === null) {
    return null;
  }
  return <div className={`notification ${errorClassName}`}>{message}</div>;
};

export default Notification;

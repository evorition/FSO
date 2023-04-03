import { useSelector } from "react-redux";

const Notification = () => {
  const notificaton = useSelector(({ notification }) => notification);

  const style = {
    display: notificaton.display,
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notificaton.message}</div>;
};

export default Notification;

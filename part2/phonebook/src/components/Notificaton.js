const Notification = ({ message, error }) => {
  const fail = {
    color: "red",
    border: "2px solid red",
    paddingLeft: "10px",
  };
  const pass = {
    color: "green",
    border: "2px solid green",
    paddingLeft: "10px",
  };

  return (
    <div>
      <p style={error ? fail : pass}>{message}</p>
    </div>
  );
};

export default Notification;

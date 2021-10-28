import { io } from "socket.io-client";
import { initialState } from "./initial";

export const showSnackBar = (store, message) => {
  store.setState({ showSnackbar: true, snackMessage: message });

  setTimeout(() => {
    store.setState({ showSnackbar: false });
  }, 3000);
};

export const signup = (store, username, password) => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  localStorage.setItem(
    "users",
    JSON.stringify([{ username, password }, ...existingUsers])
  );
  store.actions.showSnackBar("Signed up successfully!!");
};

export const login = (store, username, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const me = users.find(
    (u) => u.username === username && u.password === password
  );

  if (me) {
    store.setState({ username });
  } else {
    store.actions.showSnackBar("Invalid User!! Try Sign Up");
  }
};

export const logout = (store) => {
  store.setState({ ...initialState, socket: store.state.socket });
};

export const connectAndListen = (store) => {
  const socket = io("https://demo-chat-server.on.ag");
  socket.on("connect", () => {
    console.log("id:", socket.id);
  });
  socket.on("command", (response) => {
    store.setState({ command: response.command, showWidget: true });
  });
  store.setState({ socket });
};

export const sendMessage = (store, message) => {
  store.state.socket.emit("message", {
    author: store.state.username,
    message,
  });
};

export const sendCommand = (store) => {
  store.state.socket.emit("command");
};

export const removeAllListeners = (store) => {
  store.socket.removeAllListeners("message").removeAllListeners("command");
};

export const setShowWidget = (store, showWidget) => {
  store.setState({
    showWidget,
    command: showWidget ? store.state.command : null,
  });
};

export const onDayClick = (store, day) => {
  store.actions.sendMessage(day);
  store.setState({
    showWidget: false,
    command: null,
  });
};
export const onRateClick = (store, rateVal) => {
  store.actions.sendMessage(rateVal);
  store.setState({
    showWidget: false,
    command: null,
  });
};

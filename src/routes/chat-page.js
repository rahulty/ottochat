import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Form } from "../components/form";
import { TextField } from "../components/text-field";
import useGlobal from "../store";

function MessageBox({ msg, by }) {
  return <div class={`msg ${by === "me" ? "myMsg" : "otherMsg"}`}>{msg}</div>;
}

export default function ChatPage() {
  const [globalState, globalActions] = useGlobal();
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    globalState.socket.once("message", (res) => {
      setMsgs([{ msg: res.message, by: "other" }, ...msgs]);
    });
  }, [msgs]);

  function onSubmit(e) {
    globalActions.sendMessage(e.target.msg.value);
    setMsgs([{ msg: e.target.msg.value, by: "me" }, ...msgs]);
  }

  return (
    <Fragment>
      <div id="chat">
        <div id="msgs">
          {msgs.map((m) => (
            <MessageBox key={m.msg} msg={m.msg} by={m.by} />
          ))}
        </div>
      </div>
      <div id="sendMsgFormContainer">
        <Form onSubmit={onSubmit}>
          <TextField id="msg" placeholder="Type message..." />
          <input class="btn" type="submit" value="Send" />
        </Form>
      </div>
    </Fragment>
  );
}

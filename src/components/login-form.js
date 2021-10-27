import { Fragment, h } from "preact";
import { Form } from "../components/form";
import { TextField } from "./text-field";
import useGlobal from "../store";

export default function LoginForm() {
  const [globalState, globalActions] = useGlobal();

  function onSubmit(e) {
    const {
      username: { value: username },
      password: { value: password }
    } = e.target;
    globalActions.login(username, password);
  }
  console.log(globalState.username);

  return (
    <Fragment>
      <div className="loginFormContainer formContainer">
        <h1>Login</h1>
        <Form id="loginForm" onSubmit={onSubmit}>
          <TextField autofocus id="username" placeholder="Username" />
          <TextField type="password" id="password" placeholder="Password" />
          <input class="btn" type="submit" value="Let's Chat" />
        </Form>
      </div>
    </Fragment>
  );
}

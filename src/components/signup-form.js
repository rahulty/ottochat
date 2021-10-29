import { h } from "preact";
import useGlobal from "../store";
import { Form } from "./form";
import { TextField } from "./text-field";

export default function SignupForm() {
  const [, globalActions] = useGlobal();

  function onSubmit(e) {
    const {
      SU_username: { value: username },
      SU_password: { value: password },
    } = e.target;
    globalActions.signup(username, password);
  }

  return (
    <div className="signupFormContainer formContainer">
      <h1>Sign Up</h1>
      <Form id="signupForm" onSubmit={onSubmit}>
        <TextField tabindex="-1" id="SU_username" placeholder="Username" />
        <TextField
          tabindex="-1"
          id="SU_password"
          type="password"
          placeholder="Password"
        />
        <input tabindex="-1" class="btn" type="submit" value="Sign Up" />
      </Form>
    </div>
  );
}

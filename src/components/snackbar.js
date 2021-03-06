import { h } from "preact";
import useGlobal from "../store";

export default function Snackbar() {
  const [globalState] = useGlobal();
  return (
    <div
      id="snackbarContainer"
      class={globalState.showSnackbar ? "snackSlide" : ""}
    >
      <div id="snackbar">{globalState.snackMessage}</div>
    </div>
  );
}

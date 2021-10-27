import { Fragment, h } from "preact";
import { Widget } from "../components/widget";
import useGlobal from "../store";
import  ChatPage  from "./chat-page";
import  LoginPage  from "./login-page";

export default function MainPage() {
  const [globalState, globalActions] = useGlobal();

  return (
    <div id="mainSlider" class={globalState.username ? "slide" : ""}>
      <div class="page" id="loginPage">
        <LoginPage />
      </div>
      <div class="page" id="chatPage">
        {globalState.username && (
          <Fragment>
            <div id="chatBox">
              <div id="navBar">
                <button class="btn" onClick={globalActions.sendCommand}>
                  Command
                </button>
                <button class="btn" onClick={globalActions.logout}>
                  Logout
                </button>
              </div>

              <ChatPage />
            </div>
            {globalState.showWidget && <Widget command={globalState.command} />}
          </Fragment>
        )}
      </div>
    </div>
  );
}

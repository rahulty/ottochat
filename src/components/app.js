// import { FunctionalComponent, h } from 'preact';
// import { Route, Router } from 'preact-router';

// import Home from '../routes/home';
// import Profile from '../routes/profile';
// import NotFoundPage from '../routes/notfound';
// import Header from './header';

// const App: FunctionalComponent = () => {
//     return (
//         <div id="preact_root">
//             <Header />
//             <Router>
//                 <Route path="/" component={Home} />
//                 <Route path="/profile/" component={Profile} user="me" />
//                 <Route path="/profile/:user" component={Profile} />
//                 <NotFoundPage default />
//             </Router>
//         </div>
//     );
// };
import { useEffect } from "preact/hooks";
import useGlobal from "../store";
import MainPage from "../routes";
import Snackbar from "./snackbar";
import { h } from "preact";
// import { StateContext } from "./context";

function App() {
  const [, globalActions] = useGlobal();
  useEffect(() => {
    globalActions.connectAndListen();

    return globalActions.removeAllListeners;
  }, []);

  return (
    <div class="container">
      <MainPage />
      <Snackbar />
    </div>
  );
}

export default App;

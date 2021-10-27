import * as Preact from "preact/compat";
import globalHook from "use-global-hook";
import * as actions from "./actions";
import { initialState } from "./actions/initial";

const useGlobal = globalHook(Preact, initialState, actions);

export default useGlobal;

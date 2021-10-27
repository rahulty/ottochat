import { MapWidget } from "./map-widget";
import { RateConversationWidget } from "./rate-conv-widget";
import { CompleteWidget } from "./complete-widget";
import { DateWidget } from "./date-widget";
import useGlobalHook from "../../store";
import { h } from "preact";

const TITLE_WIDGET_MAP = (props) => ({
  map: { title: "Location", widget: <MapWidget {...props} /> },
  complete: {
    title: "Are you sure want to close the conversation",
    widget: <CompleteWidget {...props} />
  },
  date: { title: "Please select a day", widget: <DateWidget {...props} /> },
  rate: {
    title: "Rate the conversation (5 being highest)",
    widget: <RateConversationWidget {...props} />
  }
});

export function Widget({ command }) {
  const [globalState, globalActions] = useGlobalHook();

  function toggleOverlay(e) {
    if (e.target.id === "overlay") {
      globalActions.setShowWidget(!globalState.showWidget);
    }
  }

  return globalState.showWidget ? (
    <div class="overlay" id="overlay" onClick={toggleOverlay}>
      <div class="widgetContainer">
        <h1>{TITLE_WIDGET_MAP(command)[command.type].title}</h1>
        {TITLE_WIDGET_MAP(command)[command.type].widget}
      </div>
    </div>
  ) : null;
}

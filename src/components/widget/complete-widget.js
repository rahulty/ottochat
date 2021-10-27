import { h } from "preact";
import useGlobal from "../../store";

export function CompleteWidget({ data }) {
  const [, globalActions] = useGlobal();
  function onClick(e) {
    if (e.target.textContent.toLowerCase() === "no") {
      globalActions.setShowWidget(false);
    } else {
      globalActions.logout();
    }
  }

  return (
    <div id="completeCTA">
      {data.map((d) => (
        <div key={d} class="btn" onClick={onClick}>
          {d}
        </div>
      ))}
    </div>
  );
}

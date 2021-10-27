import { h } from "preact";
import { useState } from "preact/hooks";
import useGlobal from "../../store";
const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

export function RateConversationWidget({ data: commandData }) {
  const [rating, setRating] = useState(0);
  const [selection, setSelection] = useState(0);
  const [, globalActions] = useGlobal();

  const hoverOver = (e) => {
    let val = 0;
    if (e && e.target && e.target.getAttribute("data-star-id"))
      val = e.target.getAttribute("data-star-id");
    setSelection(val);
  };
  return (
    <div
      id="rateConversationWidget"
      onMouseOut={() => hoverOver(null)}
      onClick={(e) =>
        setRating(e.target.getAttribute("data-star-id") || rating)
      }
      onMouseOver={hoverOver}
    >
      <div>
        {Array.from({ length: commandData[1] }, (v, i) => (
          <Star
            starId={i + 1}
            key={`star_${i + 1}`}
            marked={selection ? selection >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      {rating && (
        <button class="btn" onClick={() => globalActions.onRateClick(rating)}>
          Rate
        </button>
      )}
    </div>
  );
}

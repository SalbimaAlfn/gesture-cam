import blur from "./effects/blur";
import gray from "./effects/gray";
import pixelate from "./effects/pixelate";
import freeze, { resetFreeze } from "./effects/freeze";
import neon from "./effects/neon";
import hearts from "./effects/hearts";
import mirror from "./effects/mirror";
import spotlight from "./effects/spotlight";

export default function applyEffect(frame, gesture) {
  switch (gesture) {
    case "peace":
      resetFreeze();
      blur(frame);
      break;

    case "thumbsUp":
      resetFreeze();
      gray(frame);
      break;

    case "ok":
      resetFreeze();
      pixelate(frame);
      break;

    case "fist":
      freeze(frame);
      break;

    case "rock":
      resetFreeze();
      neon(frame);
      break;

    case "heart":
      resetFreeze();
      hearts(frame);
      break;

    case "wave":
      resetFreeze();
      mirror(frame);
      break;

    case "point":
      resetFreeze();
      spotlight(frame);
      break;

    default:
      resetFreeze();
      break;
  }
}
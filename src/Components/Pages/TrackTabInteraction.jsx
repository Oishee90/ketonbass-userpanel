import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePostTabInteractionMutation } from "../../Redux/feature/auth/aithapi";

const TrackTabInteraction = () => {
  const location = useLocation();
  const [postTabInteraction] = usePostTabInteractionMutation();

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) {
      const segments = location.pathname.split("/");
      // ["", "dashboard", "warranty", "test", "tost"]
      const mainTab = segments[2] || "dashboard"; // প্রথম segment dashboard বাদ দিয়ে
      postTabInteraction(mainTab)
        .unwrap()
        .catch((err) => console.error("Tab interaction error:", err));
    }
  }, [location.pathname, postTabInteraction]);

  return null;
};

export default TrackTabInteraction;

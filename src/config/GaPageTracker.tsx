import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}
import { useLocation } from "react-router-dom";

export default function GaPageTracker() {
  const location = useLocation();

  useEffect(() => {
    window.gtag?.("config", "G-M3QQ2NNDGD", {
      page_path: location.pathname + location.search,
    });
  }, [location]);
  return null;
}

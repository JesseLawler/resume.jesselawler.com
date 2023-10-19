import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_LIBRARIES } from "./config";

type Props = {
  completionCallback: () => void;
};

// This silly component exists only because hooks can't be used inside classes. :p
export const GoogleApiCodeLoader: React.FC<Props> = (
  props: Props
): JSX.Element => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY?.toString() ?? "",
    libraries: GOOGLE_MAPS_API_LIBRARIES,
  });

  React.useEffect(() => {
    if (isLoaded) props.completionCallback();
  }, [isLoaded]);

  return (
    <div style={{ display: "none" }}>
      This is the component that simply loads the Google API scripts.
    </div>
  );
};

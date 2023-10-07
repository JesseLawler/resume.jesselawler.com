import React, { useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_LIBRARIES } from "./config";

const DEFAULT_HEIGHT = 200;

export type GpsCoords = {
  lat: number;
  lng: number;
  ele?: number;
};

export type GpsBounds = {
  nw: GpsCoords;
  se: GpsCoords;
};

type Props = {
  bounds?: GpsBounds;
  center?: GpsCoords;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
};

export const SimpleMap: React.FC<Props> = (props: Props): JSX.Element => {
  const { height = DEFAULT_HEIGHT, width = "100%" } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_API_LIBRARIES,
  });

  const [map, setMap] = React.useState(null);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log("onClick args: ", e);
  }, []);

  const onMapLoad = React.useCallback(function callback(map: any) {
    let bounds: google.maps.LatLngBounds | undefined = undefined;

    if (props.bounds) {
      bounds = new window.google.maps.LatLngBounds(
        props.bounds.nw,
        props.bounds.se
      );
      map.fitBounds(bounds);
      setMap(map);
      return;
    }

    if (props.center) {
      bounds = new window.google.maps.LatLngBounds(props.center);
      map.fitBounds(bounds);
      setMap(map);
      return;
    }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  if (!isLoaded) return <></>;

  return (
    <GoogleMap
      center={props.center ? props.center : undefined} // Note to self: Don't give a center or user can't drag-control the map. Annoying.
      mapContainerStyle={{ width: width, height: height, ...props.style }}
      onClick={onMapClick}
      onLoad={onMapLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
      }}
      zoom={6}
    ></GoogleMap>
  );
};

export default React.memo(SimpleMap);

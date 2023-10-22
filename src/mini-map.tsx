import React, { useCallback, useMemo, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Tooltip from "@mui/material/Tooltip";

export type LocationCoordinates = {
  lat: number;
  lng: number;
  ele?: number;
  address?: string;
  name?: string;
  trivia: string;
};

export type GpsBounds = {
  nw: LocationCoordinates;
  se: LocationCoordinates;
};

interface Props {
  bounds?: GpsBounds;
  destination?: LocationCoordinates;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const DEFAULT_DESTINATION: LocationCoordinates = {
  lat: 43.626750603536316,
  lng: -116.31038635329202,
  name: "Boise, Idaho",
  trivia: "eye of the potato storm",
};
const DEFAULT_HEIGHT = 200;
const DEFAULT_ORIGIN: LocationCoordinates = {
  lat: 40.71288895125493,
  lng: -74.01340771473777,
  address: "One World Trade Center, New York, NY 10007",
  name: "New York, New York",
  trivia: "the center of the universe",
};
const METERS_PER_MILE = 1609.344;

const formatInteger = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const MiniMap: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    destination = DEFAULT_DESTINATION,
    height = DEFAULT_HEIGHT,
    width = "100%",
  } = props;

  const [directionsLookUpResponse, setDirectionsLookUpResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = React.useState(null);
  const [travelDistance, setTravelDistance] = useState<number | null>(null); // meters
  const [travelDuration, setTravelDuration] = useState<number | null>(null); // seconds

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      isOptimisticGeolocationEnabled: true,
      positionOptions: {
        enableHighAccuracy: false,
      },
      //suppressLocationOnMount: false,
      userDecisionTimeout: 5000,
      //watchLocationPermissionChange: true,
    });

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === "OK") {
          setDirectionsLookUpResponse(result);
          setTravelDistance(result.routes[0].legs[0].distance?.value ?? null);
          setTravelDuration(result.routes[0].legs[0].duration?.value ?? null);
          console.log(
            `travelDistance: ${travelDistance}, ` +
              `travelDuration: ${travelDuration}`
          );
        } else console.log(`response: ${result}`);
      }
    },
    []
  );

  const directionsResult = useMemo(() => {
    console.log("directionsLookUpResponse: ", directionsLookUpResponse);
    return {
      directions: directionsLookUpResponse,
    };
  }, [directionsLookUpResponse]);

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      let origin = coords
        ? ({
            lat: coords.latitude,
            lng: coords.longitude,
          } as google.maps.LatLngLiteral)
        : DEFAULT_ORIGIN;
      return {
        destination: destination,
        origin: origin,
        travelMode: google.maps.TravelMode.DRIVING,
      };
    }, [coords]);

  const geoLocatorPrimaryOutput: string = !isGeolocationAvailable
    ? destination.trivia
    : !isGeolocationEnabled
    ? destination.trivia
    : coords
    ? "Determining distance..."
    : "Getting the location data...";

  const geoLocatorDetailedOutput: string = !isGeolocationAvailable
    ? "Your browser doesn't support geolocation."
    : !isGeolocationEnabled
    ? "Your browser's geolocation isn't enabled."
    : coords
    ? `Your location: latitude: ${coords?.latitude.toFixed(
        4
      )}, longitude: ${coords?.longitude.toFixed(4)}`
    : "Looking up your geolocation data...";

  // By placing mapCenter in a memo, we can avoid re-rendering the map each
  // time the user drags through the map - which is possibly the most annoying thing ever.
  const mapCenter = useMemo(() => {
    return props.destination ?? DEFAULT_DESTINATION;
  }, []);

  const milesAwayNumeric = travelDistance
    ? Math.round(travelDistance / METERS_PER_MILE)
    : null;
  let milesAway: string = "";
  if (milesAwayNumeric) {
    if (Math.round(milesAwayNumeric) <= 1) milesAway = "less than a mile away";
    else milesAway = `${formatInteger(milesAwayNumeric)} miles away`;
  }

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log("onMapClick args: ", e);
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

    if (props.destination) {
      bounds = new window.google.maps.LatLngBounds(props.destination);
      map.fitBounds(bounds);
      setMap(map);
      return;
    }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        paddingBottom: 0,
      }}
      id="mini-map"
      style={{
        border: "1px solid #2a2f35",
        borderRadius: 7,
        opacity: 0.8,
        overflow: "hidden",
        paddingTop: 0,
      }}
    >
      <ListItem id="geolocator-display">
        <div className="icon">
          <MyLocationIcon />
        </div>
        <Tooltip title={geoLocatorDetailedOutput}>
          <ListItemText
            primary={destination.name}
            secondary={travelDistance ? milesAway : geoLocatorPrimaryOutput}
            className={
              travelDistance ? "geolocation-complete" : "geolocation-incomplete"
            }
          />
        </Tooltip>
      </ListItem>
      <div className="map-container">
        <GoogleMap
          center={mapCenter}
          mapContainerStyle={{ width: width, height: height, ...props.style }}
          onClick={onMapClick}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          options={{
            streetViewControl: false,
          }}
          zoom={5}
        >
          {coords !== undefined && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
            />
          )}

          {directionsResult.directions && (
            <DirectionsRenderer options={directionsResult} />
          )}
        </GoogleMap>
      </div>
    </List>
  );
};

export default React.memo(MiniMap);

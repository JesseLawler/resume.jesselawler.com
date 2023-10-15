import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";
import { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_LIBRARIES } from "./config";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export type GpsCoords = {
  lat: number;
  lng: number;
  ele?: number;
};

export type GpsBounds = {
  nw: GpsCoords;
  se: GpsCoords;
};

const DEFAULT_ORIGIN = "1600 Pennsylvania Ave NW, Washington, DC 20500"; // JESSEFIX NOW
const DEFAULT_DESTINATION = "One World Trade Center, New York, NY 10007";
const DEFAULT_HEIGHT = 200;
const MILES_AWAY: number = 1234; // JESSEFIX NOW

interface Props {
  bounds?: GpsBounds;
  destination?: GpsCoords;
  center?: GpsCoords;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
}

const formatInteger = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const MiniMap: React.FC<Props> = (props: Props): JSX.Element => {
  const {
    destination = DEFAULT_DESTINATION,
    height = DEFAULT_HEIGHT,
    width = "100%",
  } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_API_LIBRARIES,
  });

  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  const [directionsFormValue, setDirectionsFormValue] = useState({
    origin: DEFAULT_ORIGIN,
    destination: destination,
  });

  const [map, setMap] = React.useState(null);

  /*
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  */

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      isOptimisticGeolocationEnabled: true,
      positionOptions: {
        enableHighAccuracy: false,
      },
      suppressLocationOnMount: false,
      userDecisionTimeout: undefined,
      watchLocationPermissionChange: true,
    });

  /*
  const directionsResult = useMemo(() => {
    console.log("response: ", response);
    return {
      directions: response,
    };
  }, [response]);
  */

  const mapOutput: ReactElement = !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <table>
      <tbody>
        <tr>
          <td>latitude</td>
          <td>{coords.latitude}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{coords.longitude}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>Getting the location data&hellip; </div>
  );

  /*
  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    console.log("onClick args: ", e);
  }, []);

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === "OK") {
          setResponse(result);
        } else {
          console.log("response: ", result);
        }
      }
    },
    []
  );

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        destination: directionsFormValue.destination,
        origin: directionsFormValue.origin,
        travelMode: google.maps.TravelMode.DRIVING,
      };
    }, [
      directionsFormValue.origin,
      directionsFormValue.destination,
    ]);

  const onClick = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (
      originRef.current &&
      originRef.current.value !== "" &&
      destinationRef.current &&
      destinationRef.current.value !== ""
    ) {
      console.log(`looking up directions...`); // JESSEFIX NOW
      setDirectionsFormValue((currentValue) => ({
        ...currentValue,
        origin: originRef.current?.value ?? "",
        destination: destinationRef.current?.value ?? "",
      }));
    }
  }, [originRef.current?.value, destinationRef.current?.value]);
  */
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

  /*
  const userGPSCoordinates: GpsCoords | null = coords
    ? { lat: coords?.latitude, lng: coords?.longitude }
    : null; // JESSEFIX NOW
  */

  if (!isLoaded) return <></>;

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
      }}
    >
      <div className="map-settings">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="ORIGIN">Origin</label>
              <br />
              <input
                id="ORIGIN"
                className="form-control"
                type="text"
                ref={originRef}
                value={directionsFormValue.origin ?? ""}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="form-group">
              <label htmlFor="DESTINATION">Destination</label>
              <br />
              <input
                id="DESTINATION"
                className="form-control"
                type="text"
                ref={destinationRef}
                value={JSON.stringify(directionsFormValue.destination) ?? ""}
              />
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="button"
          // JESSEFIX NOW onClick={onClick}
        >
          Build Route
        </button>
      </div>
      <ListItem>{mapOutput}</ListItem>
      <ListItem>
        <div className="icon">
          <MyLocationIcon />
        </div>
        <ListItemText
          primary="Corvallis, Oregon"
          secondary={`${formatInteger(MILES_AWAY)} miles away`}
        />
      </ListItem>
      <div className="map-container">
        <GoogleMap
          center={props.center ? props.center : undefined} // Note to self: Don't give a center or user can't drag-control the map. Annoying.
          mapContainerStyle={{ width: width, height: height, ...props.style }}
          // JESSEFIX NOW onClick={onMapClick}
          onLoad={onMapLoad}
          onUnmount={onUnmount}
          options={{
            streetViewControl: false,
          }}
          zoom={6}
        >
          {/*
          {directionsFormValue.destination !== "" &&
            directionsFormValue.origin !== "" && (
              <DirectionsService
                options={directionsServiceOptions}
                callback={directionsCallback}
              />
            )}
          {directionsResult.directions && (
            <DirectionsRenderer options={directionsResult} />
          )}
          */}
        </GoogleMap>
      </div>
    </List>
  );
};

export default React.memo(MiniMap);

import React, {
  ReactElement,
  useCallback,
  useEffect,
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
  useLoadScript,
} from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export type LocationCoordinates = {
  lat: number;
  lng: number;
  ele?: number;
  name?: string;
};

export type GpsBounds = {
  nw: LocationCoordinates;
  se: LocationCoordinates;
};

const DEFAULT_ORIGIN = {
  lat: 40.71288895125493,
  lng: -74.01340771473777,
  address: "One World Trade Center, New York, NY 10007",
  name: "New York, New York",
};
const DEFAULT_DESTINATION = {
  lat: 43.626750603536316,
  lng: -116.31038635329202,
  name: "Boise, Idaho",
};
const DEFAULT_HEIGHT = 200;
const METERS_PER_MILE = 1609.344;

interface Props {
  bounds?: GpsBounds;
  destination?: LocationCoordinates;
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

  // JESSEFIX SOON - this naming sucks
  const [directionsFormValue, setDirectionsFormValue] = useState<{
    origin: LocationCoordinates | null;
    destination: LocationCoordinates;
  }>({
    origin: DEFAULT_ORIGIN,
    destination: destination,
  });

  const [distanceFromDestination, setDistanceFromDestination] = useState<
    number | null
  >(null); // meters
  const [durationFromDestination, setDurationFromDestination] = useState<
    number | null
  >(null); // seconds
  const [map, setMap] = React.useState(null);
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );
  const [userGeoLocation, setUserGeoLocation] =
    useState<LocationCoordinates | null>(null);

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

  const directionsResult = useMemo(() => {
    console.log("response: ", response);
    return {
      directions: response,
    };
  }, [response]);

  const geoLocatorOutput: ReactElement = (
    <ListItem id="geolocator">
      <div>
        JESSEFIX: {process.env.REACT_APP_GOOGLE_MAPS_API_KEY?.toString()}
      </div>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation.</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled.</div>
      ) : coords ? (
        <table>
          <tbody>
            <tr>
              <th>latitude</th>
              <td>{coords.latitude}</td>
            </tr>
            <tr>
              <th>longitude</th>
              <td>{coords.longitude}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
    </ListItem>
  );

  const buildTravelRoute = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (coords !== undefined) {
      const directionsInput = setDirectionsFormValue((currentValue) => ({
        ...currentValue,
        origin: convertForDirections(coords),
        destination: destination,
      }));
    }
  }, [coords]);

  const convertForDirections = (
    glcCoords?: GeolocationCoordinates
  ): google.maps.LatLngLiteral | null => {
    return glcCoords === undefined
      ? null
      : {
          lat: glcCoords.latitude,
          lng: glcCoords.longitude,
        };
  };

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus
    ) => {
      if (result !== null) {
        if (status === "OK") {
          setResponse(result);
          setDistanceFromDestination(
            result.routes[0].legs[0].distance?.value ?? null
          );
          setDurationFromDestination(
            result.routes[0].legs[0].duration?.value ?? null
          );
          console.log(
            `distanceFromDestination: ${distanceFromDestination}, durationFromDestination: ${durationFromDestination}`
          );
        } else console.log(`response: ${result}`);
      }
    },
    []
  );

  const directionsServiceOptions =
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        destination: directionsFormValue.destination,
        origin: directionsFormValue.origin as LocationCoordinates,
        travelMode: google.maps.TravelMode.DRIVING,
      };
    }, [directionsFormValue.origin, directionsFormValue.destination]);

  // By placing mapCenter in a memo, we can avoid re-rendering the map each
  // time the user drags through the map - which is possibly the most annoying thing ever.
  const mapCenter = useMemo(() => {
    return props.destination ?? DEFAULT_DESTINATION;
  }, []);

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

  useEffect(() => {
    console.log(`resetting userGeoLocation to: ${JSON.stringify(coords)}`);
    setUserGeoLocation({
      lat: coords?.latitude ?? 0,
      lng: coords?.longitude ?? 0,
    });
  }, [coords?.latitude, coords?.longitude]);

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
      {geoLocatorOutput}

      <div style={{ width: "100%" }}>
        <button
          className="btn btn-primary"
          type="button"
          onClick={buildTravelRoute}
        >
          Build Route to {destination.name}
        </button>
      </div>

      <ListItem>
        <div className="icon">
          <MyLocationIcon />
        </div>
        <ListItemText
          primary={destination.name}
          secondary={
            distanceFromDestination
              ? `${formatInteger(
                  Math.round(distanceFromDestination / METERS_PER_MILE)
                )} miles away`
              : undefined
          }
        />
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
          zoom={6}
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

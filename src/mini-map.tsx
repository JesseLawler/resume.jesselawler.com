import React, { ReactElement } from "react";
import { useGeolocated } from "react-geolocated";
import { List, ListItem, ListItemText } from "@mui/material";
import SimpleMap, { GpsCoords } from "./SimpleMap";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const CORVALLIS_CHIPOTLE: GpsCoords = {
  lat: 44.56939681150158,
  lng: -123.27912127517598,
}; // Chipotle Mexican Grill

const CORVALLIS_DUTCH_BROS: GpsCoords = {
  lat: 44.5680629888922,
  lng: -123.26066771576237,
}; // Dutch Bros Coffee

const MILES_AWAY: number = 1234;

type MiniMapProps = {
  //
};

const formatInteger = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const MiniMap: React.FC<MiniMapProps> = (
  props: MiniMapProps
): JSX.Element => {
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

  const userGPSCoordinates: GpsCoords | null = coords
    ? { lat: coords?.latitude, lng: coords?.longitude }
    : null; // JESSEFIX NOW

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
      <a href="#">How far is Corvallis from me?</a>
      <SimpleMap
        //center={CORVALLIS_CHIPOTLE} // JESSEFIX merge SimpleMap into this component
        bounds={{
          nw: CORVALLIS_CHIPOTLE,
          se: CORVALLIS_DUTCH_BROS,
        }}
        height={90}
        //width={"100%"}
        style={
          {
            //marginLeft: "auto",
            //marginRight: "auto",
          }
        }
      />
    </List>
  );
};

export default React.memo(MiniMap);

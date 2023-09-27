/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, Row } from "react-bootstrap";
import "./App.css";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type StateProps = {
  autoPingsOn: boolean;
  expandedAccordionPanel: string;
};

const LIFT_OF_AVATAR = 98;
const AUTO_PING_INTERVAL_MS = 5000; // 5 seconds

const generateRandomBool = () => Math.random() < 0.5;

const generateRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

class App extends Component<any, any> {
  autoPingTimer: NodeJS.Timer | undefined;
  timestampUpdater: NodeJS.Timer | undefined;

  // JESSEFIX NOW
  constructor(props: any) {
    // JESSEFIX
    super(props);

    const defaults: StateProps = {
      autoPingsOn: false,
      expandedAccordionPanel: "",
    };

    this.state = defaults;
  }

  handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      this.setState({ expandedAccordionPanel: isExpanded ? panel : "" });
    };

  randomizePing = () => {
    this.setState({
      batteryLevel: generateRandomInt(0, 100),
      batteryMinRemaining: generateRandomInt(1, 600),
      busId: "my-bus-id-12345",
      busActive: generateRandomBool(),
      connectionStrength: generateRandomInt(1, 100),
      hasExternalPower: generateRandomBool(),
      //photo: undefined, // JESSEFIX
      routeId: "my-route-id-12345",
      trackerId: "my-tracker-id-12345",
    });
  };

  handleChange = (event: any) => {
    // JESSEFIX any
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleChange2 = (event: any) => {
    // JESSEFIX any
    this.setState({
      reviewUpdate: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <div
          style={{
            border: "1px solid #303740",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            maxWidth: 940,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 20,
            paddingTop: 125,
          }}
        >
          <Box sx={{ flexGrow: 1 }} style={{}}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <h1 className="section-header elevated">Experience</h1>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={4} style={{ position: "relative" }}>
                <Item>
                  <Avatar
                    alt="Jesse Lawler"
                    src="/images/Jesse-Lawler-square.jpg"
                    sx={{ width: 180, height: 180 }}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: -LIFT_OF_AVATAR,
                    }}
                  />
                  <img src="/images/qr-code.webp" alt="QR code" id="qr-code" />
                  <div className="name">Jesse Lawler</div>
                  <div className="role">Full Stack Developer</div>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Phone" secondary="Jan 9, 2014" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Email" secondary="Jan 7, 2014" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="GitHub"
                        secondary="July 20, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="LinkedIn"
                        secondary="July 20, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Location"
                        secondary="Corvallis, Oregon"
                      />
                    </ListItem>
                  </List>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <h1 className="section-header elevated">Skills</h1>
                <div className="chip-party">
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                </div>
              </Grid>
              <Grid item xs={4}>
                <h1 className="section-header">Humanity</h1>
                <h1 className="section-header">Credentials</h1>
                <h1 className="section-header">Map Pointer</h1>
                <h1 className="section-header">To-Do's</h1>
                <Item>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Google Fonts"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Appropriate Icons"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Import Text"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Web Hosting"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Webification"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Icons in Chips"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Work" secondary="Jan 7, 2014" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Vacation"
                        secondary="July 20, 2014"
                      />
                    </ListItem>
                  </List>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item style={{ height: 900 }}>xs=4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Switch defaultChecked />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Chip label="Chip Filled" />
                  <Chip label="Chip Outlined" variant="outlined" />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
            </Grid>
          </Box>
        </div>

        <h1>Front-End (React Client)</h1>
        <div className="form">
          <input
            name="setBookName"
            placeholder="Enter Book Name"
            onChange={this.handleChange}
          />
          <input
            name="setReview"
            placeholder="Enter Review"
            onChange={this.handleChange}
          />
        </div>
        <hr />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          style={{
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "left",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Traveling Device Bolus</h2>

          <FormGroup>
            <div style={{ display: "flex" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.autoPingsOn}
                    onChange={() =>
                      this.setState({
                        autoPingsOn: !this.state.autoPingsOn,
                      })
                    }
                    inputProps={{ "aria-label": "Automatically Send Pings" }}
                    color="primary"
                  />
                }
                label={
                  "Automatically ping every " +
                  Math.round(AUTO_PING_INTERVAL_MS / 1000) +
                  " seconds"
                }
              />
              <TextField
                id="timestamp"
                label="Timestamp"
                variant="outlined"
                name="timestamp"
                type="readonly"
                value={this.state.timestamp}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div style={{ display: "flex" }}>
              <TextField
                id="trackerId"
                label="Tracker ID"
                variant="outlined"
                name="trackerId"
                type="readonly"
                value={this.state.trackerId}
              />
              <TextField
                id="connectionStrength"
                label="Connection Strength"
                variant="outlined"
                name="connectionStrength"
                type="number"
                value={this.state.connectionStrength}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div style={{ display: "flex" }}>
              <TextField
                id="batteryLevel"
                label="Battery Level"
                variant="outlined"
                name="batteryLevel"
                type="number"
                value={this.state.batteryLevel}
              />
              <TextField
                id="batteryMinRemaining"
                label="Battery Minutes Remaining"
                variant="outlined"
                name="batteryMinRemaining"
                type="number"
                value={this.state.batteryMinRemaining}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.hasExternalPower}
                    onChange={() =>
                      this.setState({
                        hasExternalPower: !this.state.hasExternalPower,
                      })
                    }
                    inputProps={{ "aria-label": "External Power Supply" }}
                    color="secondary"
                  />
                }
                label="External Power Supply Connected"
              />
            </div>
          </FormGroup>

          <FormGroup>
            <div style={{ display: "flex" }}>
              <TextField
                id="busId"
                label="Bus ID"
                variant="outlined"
                name="busId"
                type="readonly"
                value={this.state.busId}
              />
              <TextField
                id="routeId"
                label="Route ID"
                variant="outlined"
                name="routeId"
                type="readonly"
                value={this.state.routeId}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.busActive}
                    onChange={() =>
                      this.setState({ busActive: !this.state.busActive })
                    }
                    inputProps={{ "aria-label": "Bus is Active" }}
                    color="secondary"
                  />
                }
                label="Bus is Active"
              />
            </div>
          </FormGroup>

          <div style={{ textAlign: "center" }}>
            <Button
              className="my-2"
              //color={"undefined"}
              variant="contained"
              onClick={this.randomizePing}
              style={{ marginRight: 7 }}
            >
              Randomize Entries
            </Button>
          </div>
        </Box>
        <hr />
        <div
          style={{
            width: 700,
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <ul>
            <b className="silly">Device</b>
            <li>Push up legit JPG to server</li>
          </ul>
          <ul>
            <b>User Map</b>
            <li>Expected Arrival time (current location / any stop)</li>
            <li>Bus routes</li>
            <li>Current Bus Map</li>
            <li>Anticipated Head-Count on bus</li>
            <li>Nearest bus stop to location X</li>
          </ul>

          <div
            style={{
              backgroundColor: "rgba(67, 77, 91, 0.2)",
              borderColor: "#303740",
              borderRadius: 20,
              padding: 20,
              marginBottom: 35,
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 5 }}>Bus Schedule</h2>
            <Accordion
              expanded={this.state.expandedAccordionPanel === "panel1"}
              onChange={this.handleAccordionChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  General settings
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  I am an accordion
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.expandedAccordionPanel === "panel2"}
              onChange={this.handleAccordionChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Users
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  You are currently not an owner
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.expandedAccordionPanel === "panel3"}
              onChange={this.handleAccordionChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Advanced settings
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Filtering has been entirely disabled for whole web server
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={this.state.expandedAccordionPanel === "panel4"}
              onChange={this.handleAccordionChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Personal data
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
                  Integer sit amet egestas eros, vitae egestas augue. Duis vel
                  est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <ul>
            <b>City</b>
            <li>% on-time arrivals (within X minutes)</li>
            <li>average variance in arrival time</li>
            <li>average speed of travel</li>
            <li>average number of riders by route/day/time</li>
          </ul>
          <ul>
            <b>Admin</b>
            <li>Are expected devices on/active</li>
            <li>Device battery charge</li>
            <li>Data abnormalities in last 24 hours / 72 hours / 2 weeks</li>
          </ul>
        </div>

        <Container maxWidth="sm" style={{ marginBottom: 150 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Material UI Create React App example in TypeScript
            </Typography>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default App;

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
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CodeIcon from "@mui/icons-material/Code";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import TableRowsIcon from "@mui/icons-material/TableRows";
import SchoolIcon from "@mui/icons-material/School";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import GoogleIcon from "@mui/icons-material/Google";
import FaceIcon from "@mui/icons-material/Face";
import HtmlIcon from "@mui/icons-material/Html";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";
import StarsIcon from "@mui/icons-material/Stars";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CssIcon from "@mui/icons-material/Css";
import MapIcon from "@mui/icons-material/Map";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Experience, LOW_PRIORITY, Month, Skill } from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDatabase,
  faTerminal,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAws,
  faBitbucket,
  faBitcoin,
  faJs,
  faLess,
  faNodeJs,
  faReact,
  faSass,
  faYarn,
} from "@fortawesome/free-brands-svg-icons";
import FauxGithubHeader from "./faux-github-header";
import SimpleMap from "./SimpleMap";
import { GpsCoords } from "./SimpleMap";
import { SimpleDialog } from "./qr-code-dialog";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type AppState = {
  autoPingsOn: boolean;
  expandedAccordionPanel: string;
  isQRCodeDialogOpen: boolean;
};

const LIFT_OF_AVATAR = 98;
const AUTO_PING_INTERVAL_MS = 5000; // 5 seconds
const COLOR_HIGHLIGHT = "#FFD700";
const MILES_AWAY: number = 1234;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CORVALLIS_CHIPOTLE: GpsCoords = {
  lat: 44.56939681150158,
  lng: -123.27912127517598,
}; // Chipotle Mexican Grill

const CORVALLIS_DUTCH_BROS: GpsCoords = {
  lat: 44.5680629888922,
  lng: -123.26066771576237,
}; // Dutch Bros Coffee

const EDUCATION: Experience[] = [
  {
    institution: "University of Oregon",
    role: "Computer Science, Bachelor of Arts",
    description: `I attended Clark Honors College - a highly selective sub-unit within the larger university - graduating with a 3.98 final cumulative GPA.  (Despite collegiate “grade inflation” in recent years, back in 1997 a 3.98 GPA meant something.)`,
    start: { year: 1994, month: 9 },
    end: { year: 1997, month: 5 },
  },
];

const EXPERIENCES: Experience[] = [
  {
    institution: "Scribeware",
    role: "Lead React-Native Developer",
    description: `Executed major version upgrade to multiplatform (iOS, Android, Mac + Windows desktop) React-Native/React application with Firebase backend and heavy data-sync requirements.  Designed and implemented new functional components; removed performance bottlenecks; massively simplified and harmonized a large codebase that had grown “organically” for ~10 years.
This role was a 6-month contract.`,
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 8 },
  },
  {
    institution: "Podzilla",
    role: "Senior Full-Stack Engineer",
    description:
      "Soup-to-nuts system architecture + implementation for React-Native “podcatcher” mobile app including custom API, third-party integrations, serverless back-end, public-facing UI/UX, error-handling of public RSS data, automated test suite.",
    start: { year: 2019, month: 12 },
    end: { year: 2023, month: 2 },
  },
  {
    institution: "Evil Genius Technologies",
    role: "Lead Mobile Developer",
    description: `Custom design of 30+ iOS apps for domestic + international clients, private + nonprofit.

Full-stack coding (and team oversight) using primary tech stack: Objective-C, Amazon Web Services, ASP.NET, SQL Server, HTML/CSS, innumerable API integrations per client specs.`,
    start: { year: 2010, month: 11 },
    end: { year: 2016, month: 8 },
  },
  {
    institution: "Smart Drug Smarts (podcast)",
    role: "Host/Interviewer, Producer",
    description: `I was a podcaster before it was cool.  5+ million downloads, reaching ~35,000 per week at my peak. 
Did related programming, including an extremely customized Wordpress site (PHP, MySQL) plus a dedicated iOS app (Objective-C).`,
    start: { year: 2012, month: 11 },
    end: { year: 2018, month: 5 },
  },
  {
    institution: "Antibody Films, Los Angeles, CA",
    role: "Film Producer",
    description: `Financed + Produced various “schlock” films, in genres ranging from kids comedy to fast-zombie horror.   
Oversaw editing + visual effects (Final Cut Pro) and associated marketing on the teenage web (ASP.NET, Wordpress, etc.).`,
    start: { year: 2005, month: 10 },
    end: { year: 2011, month: 12 },
  },
];
const SKILLS: Skill[] = [
  {
    name: "React-Native",
    priority: 1,
    level: 10,
    url: "https://reactnative.dev/",
    icon: "react",
  },
  {
    name: "React",
    priority: 1,
    level: 8,
    icon: "react",
    url: "https://react.dev/",
  },
  {
    name: "TypeScript",
    priority: 1,
    level: 9,
    icon: "typescript",
    url: "https://www.typescriptlang.org/",
  },
  { name: "Node.js", level: 6, icon: "node-js", url: "https://nodejs.org/" },
  {
    name: "AWS Serverless (SAM, CloudFormation, Cognito, etc.)",
    icon: "aws",
    url: "https://aws.amazon.com/what-is-aws/",
  },
  {
    name: "CI/CD (Bitbucket Pipelines)",
    icon: "bitbucket",
    url: "https://bitbucket.org/product/features/pipelines",
  },
  { name: "Postman", icon: "postman", url: "https://www.postman.com/" },
  { name: "SQL", icon: "database", url: "https://en.wikipedia.org/wiki/SQL" },
  {
    name: "Objective-C",
    priority: 2,
    icon: "apple",
    url: "https://en.wikipedia.org/wiki/Objective-C",
  },
  {
    name: "Sails.js",
    priority: 3,
    icon: "sails.js",
    url: "https://sailsjs.com/",
  },
  { name: "Bitcoin", icon: "bitcoin", url: "https://bitcoin.org/" },
  { name: "Bash", icon: "terminal", url: "https://www.gnu.org/software/bash/" },
  { name: "HTML", icon: "html", url: "https://en.wikipedia.org/wiki/HTML" },
  {
    name: "CSS",
    priority: 2,
    icon: "css",
    url: "https://en.wikipedia.org/wiki/CSS",
  },
  { name: "SASS", priority: 2, icon: "sass", url: "https://sass-lang.com/" },
  { name: "LESS", priority: 2, icon: "less", url: "https://lesscss.org/" },
  {
    name: "Google Cloud Platform",
    icon: "google",
    url: "https://cloud.google.com/",
  },
  {
    name: "Firebase",
    icon: "firebase",
    url: "https://firebase.google.com/",
  },
  { name: "Yarn", icon: "yarn", url: "https://yarnpkg.com/" },
];
// JESSEFIX and the nether regions of Xcode and Android Developer Studio.  (Experience varies from 20+ years for oldies like SQL/Bash to 3 years for newer stuff; React-Native + TypeScript are where my tools are sharpest at present.)

const formatInteger = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getLongMonthName = (date: any) => monthNames[date.getMonth()];

const getShortMonthName = (date: any) =>
  monthNames[date.getMonth()].substring(0, 3);

const generateRandomBool = () => Math.random() < 0.5;

const generateRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const icon = (iconName?: string) => {
  switch (iconName) {
    case "apple":
      return <AppleIcon />;
    case "aws":
      return <FontAwesomeIcon icon={faAws} />;
    case "bitbucket":
      return <FontAwesomeIcon icon={faBitbucket} />;
    case "bitcoin":
      return <FontAwesomeIcon icon={faBitcoin} />;
    case "code":
      return <CodeIcon />;
    case "css":
      return <CssIcon />;
    case "database":
      return <FontAwesomeIcon icon={faDatabase} />;
    case "html":
      return <HtmlIcon />;
    case "face":
      return <FaceIcon />;
    case "firebase":
      return (
        <img
          src="/images/logos/firebase-bw.png"
          alt="Firebase logo"
          style={{ height: 18, marginLeft: 10 }}
        />
      );
    case "google":
      return <GoogleIcon />;
    case "js":
      return <FontAwesomeIcon icon={faJs} />;
    case "less":
      return <FontAwesomeIcon icon={faLess} />;
    case "node-js":
      return <FontAwesomeIcon icon={faNodeJs} />;
    case "postman":
      return (
        <img
          src="/images/logos/postman-bw.png"
          alt="Postman logo"
          style={{ height: 17, marginLeft: 7 }}
        />
      );
    case "react":
      return <FontAwesomeIcon icon={faReact} />;
    case "sails.js":
      return (
        <img
          src="/images/logos/sails.js-bw.png"
          alt="Sails.js logo"
          style={{ height: 15, marginLeft: 8 }}
        />
      );
    case "sass":
      return <FontAwesomeIcon icon={faSass} />;
    case "terminal":
      return <FontAwesomeIcon icon={faTerminal} />;
    case "typescript":
      return (
        <img
          src="/images/logos/typescript-bw.png"
          alt="TypeScript logo"
          style={{ height: 15, marginLeft: 11 }}
        />
      );
    case "yarn":
      return <FontAwesomeIcon icon={faYarn} />;
    default:
      return <FontAwesomeIcon icon={faCoffee} style={{ color: "red" }} />;
  }
};

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

function openInNewTab(url: string) {
  var win = window.open(url, "_blank");
  win!.focus();
}

class App extends Component<any, any> {
  autoPingTimer: NodeJS.Timer | undefined;
  timestampUpdater: NodeJS.Timer | undefined;

  // JESSEFIX NOW
  constructor(props: any) {
    // JESSEFIX
    super(props);

    const defaults: AppState = {
      autoPingsOn: false,
      expandedAccordionPanel: "",
      isQRCodeDialogOpen: false,
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
            paddingTop: 15,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginBottom: 36 }}>
                <FauxGithubHeader />
              </Grid>
              <Grid item xs={4} className="experience">
                <h1 className="section-header elevated">
                  <CheckCircleIcon className="icon" />
                  Experience
                </h1>
                {EXPERIENCES.map((e: Experience) => (
                  <Item>
                    <div className="institution">{e.institution}</div>
                    <div className="role">{e.role}</div>
                    <div className="period">
                      {`${getLongMonthName(
                        new Date(e.start.year, e.start.month)
                      )} ${e.start.year}  - ${getLongMonthName(
                        new Date(e.end.year, e.end.month)
                      )} ${e.end.year}`}
                    </div>
                    <div className="description">{e.description}</div>
                  </Item>
                ))}
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  position: "relative",
                }}
                className="main"
              >
                <Item style={{ backgroundColor: "#00445522" }}>
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
                  <a
                    href="#"
                    onClick={() => this.setState({ isQRCodeDialogOpen: true })}
                  >
                    <img
                      src="/images/qr-code.png"
                      alt="QR code"
                      id="qr-code-button"
                    />
                  </a>
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
                          <PhoneAndroidIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Phone"
                        secondary="(323) 513-8779"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AlternateEmailIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Email"
                        secondary="business@JesseLawler.com"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <GitHubIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="GitHub"
                        secondary="https://github.com/JesseLawler"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LinkedInIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="LinkedIn"
                        secondary="https://www.linkedin.com/in/jesselawler/"
                      />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <TwitterIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Twitter"
                        secondary="https://twitter.com/Lawlerpalooza"
                      />
                    </ListItem>
                  </List>
                </Item>
                <h1 className="section-header">
                  <LocationOnIcon className="icon" style={{ width: 36 }} />
                  Location
                </h1>
                <Item>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      paddingBottom: 0,
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <MapIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Corvallis, Oregon"
                        secondary={`${formatInteger(MILES_AWAY)} miles away`}
                      />
                    </ListItem>
                    <div className="incomplete">How far away is this?</div>
                    <SimpleMap
                      //center={CORVALLIS_CHIPOTLE}
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
                </Item>
                <h1 className="section-header">
                  <FavoriteBorderIcon className="icon" style={{ width: 32 }} />
                  Humanity
                </h1>
                <div id="short-bio">
                  I’ve bicycled from Los Angeles to Florida, use Photoshop at a
                  professional level, and have hand-coded Bitcoin transactions.
                  (Despite this, my kids still maintain I’m not all that cool.)
                  Also, I wake up extremely early - basically living in the East
                  Coast time zone from the West Coast.
                </div>
              </Grid>
              <Grid item xs={4}>
                <h1 className="section-header elevated">
                  <CodeIcon className="icon" />
                  Skills
                </h1>
                <div className="chip-party">
                  {SKILLS.sort((a: Skill, b: Skill) => {
                    return (a.priority ?? LOW_PRIORITY) >
                      (b.priority ?? LOW_PRIORITY)
                      ? 1
                      : a.priority === b.priority
                      ? 0
                      : -1;
                  }).map((skill: Skill) => (
                    <Chip
                      label={skill.name}
                      icon={icon(skill.icon)}
                      variant={
                        skill.priority === undefined ? "outlined" : "filled"
                      }
                      style={{
                        backgroundColor:
                          skill.url === undefined
                            ? "red"
                            : `rgba(80, 80, 80, ` +
                              (skill.level ?? 3) / 10 +
                              `)`,
                      }}
                      onClick={
                        skill.url === undefined
                          ? undefined
                          : () => openInNewTab(skill.url!)
                      }
                    />
                  ))}
                </div>
                <h1 className="section-header">
                  <StarsIcon className="icon" />
                  Awards
                </h1>
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
                          <FontAwesomeIcon icon={faUserGraduate} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Summa Cum Laude"
                        secondary="University of Oregon, 1997"
                      />
                    </ListItem>
                  </List>
                </Item>
                <h1 className="section-header">
                  <SchoolIcon className="icon" />
                  Education
                </h1>
                <div className="experience education">
                  {EDUCATION.map((e: Experience) => (
                    <Item>
                      <div className="institution">{e.institution}</div>
                      <div className="role">{e.role}</div>
                      <div className="period">
                        {`${getLongMonthName(
                          new Date(e.start.year, e.start.month)
                        )} ${e.start.year}  - ${getLongMonthName(
                          new Date(e.end.year, e.end.month)
                        )} ${e.end.year}`}
                      </div>
                      <div className="description">{e.description}</div>
                    </Item>
                  ))}
                </div>
              </Grid>
              <Grid item xs={4}>
                <h1 className="section-header">
                  <CheckIcon className="icon" />
                  To-Do's
                </h1>
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
                        primary="Valid QR code"
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
                        primary="AWS Serverless progress bars"
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                  </List>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Switch defaultChecked />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>

        <SimpleDialog
          open={this.state.isQRCodeDialogOpen}
          onClose={() => this.setState({ isQRCodeDialogOpen: false })}
        />

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

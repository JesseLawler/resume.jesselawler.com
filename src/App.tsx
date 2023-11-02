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
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./main.css";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CodeIcon from "@mui/icons-material/Code";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ImageIcon from "@mui/icons-material/Image";
import SchoolIcon from "@mui/icons-material/School";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import FaceIcon from "@mui/icons-material/Face";
import HtmlIcon from "@mui/icons-material/Html";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";
import StarsIcon from "@mui/icons-material/Stars";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CssIcon from "@mui/icons-material/Css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Experience, LOW_PRIORITY, MeansOfContact, Skill } from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDatabase,
  faScroll,
  faSpaghettiMonsterFlying,
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
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import FauxGithubHeader from "./faux-github-header";
import { GoogleApiCodeLoader } from "./google-api-code-loader";
import { LocationCoordinates, MiniMap } from "./mini-map";
import { SimpleDialog } from "./qr-code-dialog";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

type AppProps = {};

type AppState = {
  autoPingsOn: boolean;
  expandedAccordionPanel: string;
  isGoogleApiReady: boolean;
  isQRCodeDialogOpen: boolean;
  printMostRecentClickTimestamp: number;
  showAllPanels: boolean;
};

const DELAY_BEFORE_PRINTING = 700; // milliseconds

const LIFT_OF_AVATAR = 98;

const MONTH_NAMES = [
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

const CONTACT_LIST: MeansOfContact[] = [
  {
    name: "Phone",
    value: "(323) 513-8779",
    icon: "phone",
    url: "phone:3235138779",
  },
  {
    name: "Email",
    value: "business@JesseLawler.com",
    icon: "email",
    url: "mailto:business@JesseLawler.com",
  },
  {
    name: "GitHub",
    value: "github.com/JesseLawler",
    icon: "github",
    url: "https://github.com/JesseLawler",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/jesselawler",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/jesselawler/",
  },
  {
    name: "Twitter",
    value: "twitter.com/Lawlerpalooza",
    icon: "twitter",
    url: "https://twitter.com/Lawlerpalooza",
  },
];

const CORVALLIS_CHIPOTLE: LocationCoordinates = {
  lat: 44.56939681150158,
  lng: -123.27912127517598,
  name: "Corvallis, Oregon",
  trivia: "~90 minutes south of Portland",
}; // Chipotle Mexican Grill

const CORVALLIS_DUTCH_BROS: LocationCoordinates = {
  lat: 44.5680629888922,
  lng: -123.26066771576237,
  trivia: "better coffee than Starbucks",
}; // Dutch Bros Coffee

const EDUCATION: Experience[] = [
  {
    institution: "University of Oregon",
    role: "Computer Science\nBachelor of Arts",
    description: `I graduated university with a 3.98 final cumulative GPA -- 
    back in the before-times when a 4.0 GPA was the maximum possible.`,
    //start: { year: 1994, month: 9 },
    //end: { year: 1997, month: 5 },
  },
];

const EXPERIENCES: Experience[] = [
  {
    institution: "Scribeware",
    role: "Lead Mobile Developer",
    description: `Executed major version upgrade for a multiplatform React-Native/React app with Firebase backend and heavy data-sync requirements.\n
    Implemented new components, customized libraries, removed performance bottlenecks, harmonized large codebase for code re-use and long-term maintainability. (This role was a 6-month contract.)`,
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 8 },
  },
  {
    institution: "Podzilla",
    role: "Senior Full-Stack Engineer",
    description: `Full system architecture and implementation for “podcatcher” mobile app built in React-Native using AWS serverless back-end (Lambda, DynamoDB, Cognito, S3, API Gateway...).\n
      Designed public-facing UI/UX, automated test suite, error handling for often-funky public RSS feeds.`,
    start: { year: 2019, month: 12 },
    end: { year: 2023, month: 2 },
  },
  {
    institution: "Evil Genius Technologies",
    role: "Lead Mobile Developer",
    description: `Led the design and implementation for dozens of iOS apps for domestic and international clients, typically small to mid-size businesses and nonprofits without in-house developers.\n
    Full-stack coding (and dev-team oversight) using primary tech stack: Objective-C, AWS, .NET, SQL Server, Responsive CSS, API integrations per client specs.`,
    start: { year: 2010, month: 11 },
    end: { year: 2017, month: 3 },
  },
  {
    institution: "Smart Drug Smarts",
    role: "Podcast Host + Producer",
    description: `Headlined a weekly podcast back before everyone had a podcast.  Over 5 million downloads, eventually reaching ~35,000 per week.\n
Associated programming included a highly-custom Wordpress site (PHP, MySQL) and a dedicated iOS app (Objective-C).`,
    start: { year: 2012, month: 11 },
    end: { year: 2018, month: 5 },
  },
  {
    institution: "Antibody Films",
    role: "Film Producer",
    description: `Financed and produced “schlock” films in genres ranging from kids comedy to zombie horror.\n
Led technical editing + visual effects teams and online marketing with then-current tools (ASP.NET, Wordpress, etc.).`,
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

  {
    name: "Lambda",
    icon: "aws",
    url: "https://aws.amazon.com/lambda/",
    priority: 3,
  },

  {
    name: "Node.js",
    level: 6,
    icon: "node-js",
    url: "https://nodejs.org/",
    priority: 2,
  },
  {
    name: "CloudFormation",
    icon: "aws",
    url: "https://aws.amazon.com/cloudformation/",
    priority: 3,
  },
  {
    name: "SAM",
    icon: "aws",
    url: "https://aws.amazon.com/serverless/sam/",
    priority: 3,
  },
  {
    name: "DynamoDB",
    icon: "aws",
    url: "https://aws.amazon.com/dynamodb/",
    priority: 5,
  },
  {
    name: "Cognito",
    icon: "aws",
    url: "https://aws.amazon.com/cognito/",
    priority: 5,
  },
  {
    name: "S3",
    icon: "aws",
    url: "https://aws.amazon.com/s3/",
    priority: 5,
  },
  {
    name: "Route 53",
    icon: "aws",
    url: "https://aws.amazon.com/route53/",
    priority: 5,
  },
  {
    name: "API Gateway",
    icon: "aws",
    url: "https://aws.amazon.com/api-gateway/",
    priority: 4,
  },
  {
    name: "EC2",
    icon: "aws",
    url: "https://aws.amazon.com/ec2/",
    priority: 4,
  },
  {
    name: "Step Functions",
    icon: "aws",
    url: "https://aws.amazon.com/step-functions/",
    priority: 4,
  },
  {
    name: "GitHub Actions",
    icon: "github",
    url: "https://github.com/features/actions",
    priority: 2,
  },
  {
    name: "Postman",
    icon: "postman",
    url: "https://www.postman.com/",
    priority: 5,
  },
  {
    name: "SQL",
    icon: "database",
    url: "https://en.wikipedia.org/wiki/SQL",
    priority: 3,
  },
  {
    name: "NoSQL",
    icon: "database",
    url: "https://en.wikipedia.org/wiki/NoSQL",
    priority: 3,
  },
  {
    name: "Objective-C",
    priority: 4,
    icon: "apple",
    url: "https://en.wikipedia.org/wiki/Objective-C",
  },
  {
    name: "Sails.js",
    icon: "sails.js",
    url: "https://sailsjs.com/",
    priority: 5,
  },
  {
    name: "Bitcoin",
    icon: "bitcoin",
    url: "https://bitcoin.org/",
    priority: 5,
  },
  {
    name: "Bash",
    icon: "terminal",
    url: "https://www.gnu.org/software/bash/",
    priority: 7,
  },
  {
    name: "HTML",
    icon: "html",
    url: "https://en.wikipedia.org/wiki/HTML",
    priority: 7,
  },
  {
    name: "CSS",
    icon: "css",
    url: "https://en.wikipedia.org/wiki/CSS",
    priority: 6,
  },
  { name: "SASS", icon: "sass", url: "https://sass-lang.com/", priority: 6 },
  { name: "LESS", icon: "less", url: "https://lesscss.org/", priority: 6 },
  {
    name: "Google Cloud Platform",
    icon: "google",
    url: "https://cloud.google.com/",
    priority: 4,
  },
  {
    name: "Firebase",
    icon: "firebase",
    url: "https://firebase.google.com/",
    priority: 2,
  },
  { name: "Yarn", icon: "yarn", url: "https://yarnpkg.com/", priority: 7 },
];

const getLongMonthName = (date: any) => MONTH_NAMES[date.getMonth()];

const getShortMonthName = (date: any) =>
  MONTH_NAMES[date.getMonth()].substring(0, 3);

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
    case "email":
      return <AlternateEmailIcon />;
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
    case "github":
      return <GitHubIcon />;
    case "google":
      return <GoogleIcon />;
    case "js":
      return <FontAwesomeIcon icon={faJs} />;
    case "less":
      return <FontAwesomeIcon icon={faLess} />;
    case "linkedin":
      return <LinkedInIcon />;
    case "node-js":
      return <FontAwesomeIcon icon={faNodeJs} />;
    case "phone":
      return <PhoneAndroidIcon />;
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
    case "twitter":
      return <TwitterIcon />;
    case "yarn":
      return <FontAwesomeIcon icon={faYarn} />;
    default:
      return <FontAwesomeIcon icon={faCoffee} style={{ color: "red" }} />;
  }
};

const isDev = () =>
  window.location.href.substring(0, 16) === "http://localhost";

function Copyright() {
  return (
    <div id="copyright" className="hide-if-printing">
      <Typography variant="body2" align="center">
        copyright © Jesse Lawler {new Date().getFullYear()}
        <span style={{ margin: "0px 10px 0px 14px" }}>&bull;</span>
        <a
          href="https://github.com/JesseLawler/resume.jesselawler.com"
          target="_blank"
        >
          <CodeIcon
            style={{
              marginLeft: 1,
              marginRight: 5,
              marginBottom: -7,
              width: 22,
            }}
          />
          view source code
        </a>
      </Typography>
    </div>
  );
}

function openInNewTab(url: string) {
  var win = window.open(url, "_blank");
  win!.focus();
}

class App extends Component<AppProps, AppState> {
  autoPingTimer: NodeJS.Timer | undefined;
  timestampUpdater: NodeJS.Timer | undefined;

  constructor(props: AppProps) {
    super(props);

    const defaults: AppState = {
      autoPingsOn: false,
      expandedAccordionPanel: "",
      isGoogleApiReady: false,
      isQRCodeDialogOpen: false,
      printMostRecentClickTimestamp: 0,
      showAllPanels: false,
    };

    this.state = defaults;
  }

  handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      this.setState({ expandedAccordionPanel: isExpanded ? panel : "" });
    };

  handleClickPrint = () => {
    this.setState({
      printMostRecentClickTimestamp: new Date().getTime(),
    });
    setTimeout(() => {
      window.print(); // open the print dialog only after the state change
    }, DELAY_BEFORE_PRINTING);
  };

  handleToggleShowAll = () => {
    console.log("toggling the open state of all panels...");
    this.setState({
      showAllPanels: !this.state.showAllPanels,
    });
  };

  printClickedInPast15Seconds = () => {
    const now = new Date().getTime();
    const fifteenSecondsAgo = now - 15000;
    return this.state.printMostRecentClickTimestamp > fifteenSecondsAgo;
  };

  setGoogleApiReady = () => {
    this.setState({ isGoogleApiReady: true });
  };

  render() {
    return (
      <div className="App">
        <GoogleApiCodeLoader completionCallback={this.setGoogleApiReady} />
        <div id="primary-container">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginBottom: 36 }}>
                <FauxGithubHeader
                  onToggleShowAll={this.handleToggleShowAll}
                  onClickPrint={this.handleClickPrint}
                />
              </Grid>
              <Grid item md={4} xs={6} className="experience">
                <h1 className="section-header elevated">
                  <CheckCircleIcon className="icon" />
                  Experience
                </h1>
                {EXPERIENCES.map((e: Experience, index: number) => (
                  <Item key={`exp-${index}`}>
                    <div
                      onMouseOver={() =>
                        this.setState({
                          expandedAccordionPanel:
                            "experience-panel-" + index.toString(),
                        })
                      }
                    >
                      <Accordion
                        expanded={
                          this.state.showAllPanels ||
                          this.printClickedInPast15Seconds() ||
                          this.state.expandedAccordionPanel ===
                            `experience-panel-${index}`
                        }
                        onChange={this.handleAccordionChange(
                          "experience-panel-" + index.toString()
                        )}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`experience-panel-${index}-content`}
                        >
                          <div className="institution">{e.institution}</div>
                          <p className="role">{e.role}</p>
                          <div className="period">
                            {e.start === undefined
                              ? ""
                              : `${getLongMonthName(
                                  new Date(e.start.year, e.start.month)
                                )} ${e.start.year} - `}
                            {e.end === undefined
                              ? ""
                              : getLongMonthName(
                                  new Date(e.end.year, e.end.month)
                                ) +
                                " " +
                                e.end.year}
                          </div>
                        </AccordionSummary>
                        <AccordionDetails className="description">
                          {e.description.split("\n").map((line: string) => (
                            <p key={`line-${line}`}>{line}</p>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Item>
                ))}
              </Grid>
              <Grid
                item
                md={4}
                xs={6}
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
                    className="hide-if-narrow"
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
                      bgcolor: "background.paper",
                    }}
                  >
                    {CONTACT_LIST.map(
                      (contact: MeansOfContact, index: number) => {
                        return (
                          <a
                            key={`contact-${index}`}
                            onClick={() => {
                              if (
                                contact.url?.substring(0, 7) === "mailto:" ||
                                contact.url?.substring(0, 6) === "phone:"
                              )
                                window.open(contact.url);
                              // open in the same tab
                              else window.open(contact.url, "_blank"); // open in new tab
                            }}
                          >
                            <ListItem>
                              <div className="icon">{icon(contact.icon)}</div>
                              <ListItemText
                                primary={contact.name}
                                secondary={contact.value}
                              />
                            </ListItem>
                            {index < CONTACT_LIST.length - 1 ? (
                              <Divider />
                            ) : null}
                          </a>
                        );
                      }
                    )}
                  </List>
                </Item>
                <h1 className="section-header">
                  <LocationOnIcon className="icon" style={{ width: 36 }} />
                  Location
                </h1>
                <Item>
                  {this.state.isGoogleApiReady && (
                    <MiniMap
                      bounds={{
                        nw: CORVALLIS_CHIPOTLE,
                        se: CORVALLIS_DUTCH_BROS,
                      }}
                      destination={CORVALLIS_CHIPOTLE}
                      height={90}
                    />
                  )}
                </Item>
                <h1 className="section-header">
                  <FavoriteBorderIcon className="icon" style={{ width: 32 }} />
                  Humanity
                </h1>
                <div id="short-bio">
                  <p>
                    When not at the computer, I have bicycled cross-country from
                    San Diego to Florida, climbed the highest mountain in the
                    lower 48 states, and organized zombie flash-mobs in Los
                    Angeles.
                  </p>
                  <p>I am occasionally mistaken for Trent Reznor.</p>
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <h1 className="section-header elevated only-if-wide">
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
                  }).map((skill: Skill, index: number) => {
                    const bgColorPart1 = "rgba(43,50,58,"; // "rgba(27,37,41,";
                    const priorityColor =
                      bgColorPart1 +
                      (1.1 - (skill.priority ?? 0) / 10).toFixed(1) +
                      ")";
                    return (
                      <a
                        key={`chip-${index}`}
                        href={skill.url!}
                        target="_blank"
                      >
                        <Chip
                          label={skill.name}
                          icon={icon(skill.icon)}
                          variant={"outlined"}
                          style={{
                            backgroundColor: priorityColor,
                            borderColor: bgColorPart1 + "0.5)",
                          }}
                        />
                      </a>
                    );
                  })}
                </div>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={6}>
                    <h1 className="section-header">
                      <StarsIcon className="icon" />
                      Honors
                    </h1>
                    <Item>
                      <List
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                        }}
                        id="honors"
                      >
                        <ListItem>
                          <div className="icon">
                            <FontAwesomeIcon icon={faUserGraduate} />
                          </div>
                          <ListItemText
                            primary="Summa Cum Laude"
                            secondary="University of Oregon, 1997"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <div className="icon">
                            <FontAwesomeIcon icon={faScroll} />
                          </div>
                          <ListItemText
                            primary="Senior Thesis Honors"
                            secondary="Clark Honors College, 1997"
                          />
                        </ListItem>
                        {/*
                        <Divider />
                        <a
                          onClick={() => {
                            window.open(
                              "https://www.spaghettimonster.org/",
                              "_blank"
                            );
                          }}
                        >
                          <ListItem>
                            <div className="icon">
                              <FontAwesomeIcon
                                icon={faSpaghettiMonsterFlying}
                              />
                            </div>

                            <ListItemText
                              primary="Ordained Minister"
                              secondary="Church of the Flying Spaghetti Monster"
                            />
                          </ListItem>
                        </a>
                        <a
                          onClick={() => {
                            window.open(
                              "https://birdsarentreal.com/",
                              "_blank"
                            );
                          }}
                        >
                          <ListItem>
                            <div className="icon">
                              <FontAwesomeIcon
                                icon={faSpaghettiMonsterFlying}
                              />
                            </div>

                            <ListItemText
                              primary="Activist of the Year, 2021"
                              secondary="Birds Aren't Real"
                            />
                          </ListItem>
                        </a>
                        */}
                      </List>
                    </Item>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <h1 className="section-header">
                      <SchoolIcon className="icon" />
                      Education
                    </h1>
                    <div className="experience education">
                      {EDUCATION.map((e: Experience, index: number) => (
                        <Item key={`edu-${index}`}>
                          <div
                            onMouseOver={() =>
                              this.setState({
                                expandedAccordionPanel:
                                  "education-panel-" + index.toString(),
                              })
                            }
                          >
                            <Accordion
                              expanded={
                                this.state.showAllPanels ||
                                this.printClickedInPast15Seconds() ||
                                this.state.expandedAccordionPanel ===
                                  `education-panel-${index}`
                              }
                              onChange={this.handleAccordionChange(
                                "education-panel-" + index.toString()
                              )}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`education-panel-${index}-content`}
                              >
                                <div className="institution">
                                  {e.institution}
                                </div>
                                {e.role
                                  .split("\n")
                                  .map((line: string, idx2: number) => (
                                    <p className="role" key={`line-${idx2}`}>
                                      {line}
                                    </p>
                                  ))}
                                <div className="period">
                                  {e.start === undefined
                                    ? ""
                                    : `${getLongMonthName(
                                        new Date(e.start.year, e.start.month)
                                      )} ${e.start.year} - `}
                                  {e.end === undefined
                                    ? ""
                                    : getLongMonthName(
                                        new Date(e.end.year, e.end.month)
                                      ) +
                                      " " +
                                      e.end.year}
                                </div>
                              </AccordionSummary>
                              <AccordionDetails className="description">
                                {e.description}
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </Item>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </div>

        <SimpleDialog
          open={this.state.isQRCodeDialogOpen}
          onClose={() => this.setState({ isQRCodeDialogOpen: false })}
        />
      </div>
    );
  }
}

export default App;

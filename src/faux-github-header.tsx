import React from "react";

const numWeeks = 52;

const BASE_COLOR = "#00ee00";
const BACKGROUND_COLOR = "#0f1217";
const DAY_DIMENSION = 11;
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EMPTY_DAY_COLOR = "#262a2f";

type FauxGithubHeaderProps = {
  height?: number;
  width?: number;
};

const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const FauxGithubHeader: React.FC<FauxGithubHeaderProps> = (
  props: FauxGithubHeaderProps
): JSX.Element => {
  const { height = 100, width = "100%" } = props;

  const displayDayName = (day: string): boolean =>
    day === "Mon" || day === "Wed" || day === "Fri";

  const dayMarker = (commits: number): JSX.Element => {
    return (
      <div
        style={{
          height: DAY_DIMENSION,
          width: DAY_DIMENSION,
          backgroundColor:
            commits === 0
              ? EMPTY_DAY_COLOR
              : BASE_COLOR + (commits * 51).toString(16),
          borderRadius: 2,
          border:
            "1px solid " + (commits === 0 ? "transparent" : BASE_COLOR + "22"),
        }}
      />
    );
  };

  return (
    <div
      id="faux-github-header"
      style={{
        width: width,
        backgroundColor: BACKGROUND_COLOR,
        border: "1px solid #2a2f35",
        borderRadius: 7,
        padding: "10px 25px 10px 25px",
        opacity: 0.8,
      }}
    >
      <table style={{ width: "100%" }}>
        <thead></thead>
        <tbody>
          <tr>
            <th></th>
            <td colSpan={10}>woot</td>
          </tr>
          {DAYS_OF_WEEK.map((day) => (
            <tr>
              {day === "Sun" ? (
                <td></td>
              ) : displayDayName(day) ? (
                <td
                  rowSpan={2}
                  style={{
                    fontSize: 12,
                    textAlign: "left",
                    lineHeight: 1.0,
                    verticalAlign: "top",
                    paddingRight: 5,
                  }}
                >
                  {day}
                </td>
              ) : (
                ""
              )}
              {Array.from(Array(numWeeks).keys()).map((week) => (
                <td style={{ padding: 1 }}>{dayMarker(randomInteger(0, 5))}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={numWeeks + 1}>
              <div style={{ float: "left" }}>
                Learn how we count contributions
              </div>
              <div id="legend">
                <span style={{ marginRight: 4 }}>Less</span>
                <span className="sample-day">{dayMarker(0)}</span>
                <span className="sample-day">{dayMarker(1)}</span>
                <span className="sample-day">{dayMarker(2)}</span>
                <span className="sample-day">{dayMarker(3)}</span>
                <span className="sample-day">{dayMarker(4)}</span>
                <span style={{ marginLeft: 4 }}>More</span>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default React.memo(FauxGithubHeader);

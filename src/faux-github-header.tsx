import React from "react";
import Tooltip from "@mui/material/Tooltip";

const numWeeks = 52;

const BASE_COLOR = "#00ee00";
const DAY_DIMENSION = 11;
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EMPTY_DAY_COLOR = "#262a2f";
const MICROSECONDS_IN_DAY = 86400000;

type FauxGithubHeaderProps = {
  height?: number;
  width?: number;
};

const MonthName = (month: number): string => {
  if (month === 0) return "Jan";
  if (month === 1) return "Feb";
  if (month === 2) return "Mar";
  if (month === 3) return "Apr";
  if (month === 4) return "May";
  if (month === 5) return "Jun";
  if (month === 6) return "Jul";
  if (month === 7) return "Aug";
  if (month === 8) return "Sep";
  if (month === 9) return "Oct";
  if (month === 10) return "Nov";
  if (month === 11) return "Dec";
  return "";
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

  const nextMonth = () => {
    const today = new Date();
    const m = today.getMonth() + 1;
    return m === 12 ? 0 : m;
  };

  const dateOfCalendarDay = (week: number, dayOfWeekIndex: number) => {
    const daysSinceCalendarStart = week * 7 + dayOfWeekIndex;
    let tempDate = new Date();
    const dt = new Date(
      tempDate.setTime(
        _firstCalendarDay.getTime() +
          daysSinceCalendarStart * MICROSECONDS_IN_DAY
      )
    );
    return dt;
  };

  // This function returns the day of the week
  // for the first day of the month 11 months ago,
  // *then* determines the date of the Sunday that
  // began that week (which could be in the previous
  // month or even the previous year).
  const dateOfCalendarStart = () => {
    const today = new Date();
    const m = nextMonth();
    const y = today.getFullYear() - (m === 0 ? 0 : 1); // previous year -- unless next month is January, in which case stay on this year
    const firstDayOfMonth = new Date(y, m, 1);
    const tempDate = new Date();
    var previousSunday = new Date(
      tempDate.setTime(
        firstDayOfMonth.getTime() -
          firstDayOfMonth.getDay() * MICROSECONDS_IN_DAY
      )
    );
    return previousSunday;
  };

  const _firstCalendarDay: Date = dateOfCalendarStart();

  const newMonthStartingThisWeek = (sunday: Date): string => {
    // check for 7 days
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date();
      var dt = new Date(
        tempDate.setTime(sunday.getTime() + i * MICROSECONDS_IN_DAY)
      );
      if (dt.getDate() === 1) return MonthName(dt.getMonth());
    }
    return "";
  };

  return (
    <div
      id="faux-github-header"
      style={{
        width: width,
        border: "1px solid #2a2f35",
        borderRadius: 7,
        padding: "10px 25px 10px 25px",
        opacity: 0.8,
        overflow: "scroll" /* JESSEFIX scroll to the right by default */,
      }}
    >
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th></th>
            {Array.from(Array(numWeeks).keys()).map((week, weekIndex) => {
              let tempDate = new Date();
              const sundayOfWeek = new Date(
                tempDate.setTime(
                  _firstCalendarDay.getTime() + week * 7 * MICROSECONDS_IN_DAY
                )
              );
              return (
                <th
                  key={`week-${weekIndex}`}
                  style={{
                    fontSize: 12,
                    maxWidth: 11, // overflow is just fine ;)
                  }}
                >
                  {newMonthStartingThisWeek(sundayOfWeek)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {DAYS_OF_WEEK.map((day, dayIndex) => (
            <tr key={`row-${dayIndex}`}>
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
              {Array.from(Array(numWeeks).keys()).map((week) => {
                const maxCommits = 4;
                const baseLow = -1; // going lower-than-0 increases odds of zero-work days
                const baseHigh = maxCommits + 1; // going higher-than-maxCommits increases odds of max-work days
                const rando =
                  Math.floor(Math.random() * (baseHigh - baseLow + 1)) +
                  baseLow; // random float between baseLow and baseHigh
                let adjustmentMultiple = 1;
                if (day === "Sun" || day === "Sat") adjustmentMultiple = 0.5;
                if (day === "Mon" || day === "Wed") adjustmentMultiple = 1.65;
                let adjustedRando = rando * adjustmentMultiple;
                // enforce lower and upper bounds
                if (adjustedRando < 0) adjustedRando = 0;
                if (adjustedRando > maxCommits) adjustedRando = maxCommits;
                // don't show work on future days
                const cellDate = dateOfCalendarDay(week, dayIndex);
                return (
                  <td key={`w${week}-d${dayIndex}`}>
                    {cellDate <= new Date() && (
                      <Tooltip
                        title={cellDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      >
                        {dayMarker(Math.round(adjustedRando))}
                      </Tooltip>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={numWeeks + 1} style={{ verticalAlign: "middle" }}>
              <Tooltip
                title={
                  "This isn't real data. I just think it looks cool. Design inspiration: GitHub"
                }
                placement="top"
              >
                <div style={{ float: "left", cursor: "pointer" }}>
                  Learn how we count contributions
                </div>
              </Tooltip>
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

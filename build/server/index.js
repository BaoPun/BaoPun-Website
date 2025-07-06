var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useNavigate, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const page = "_page_65b89_1";
const main = "_main_65b89_59";
const title = "_title_65b89_345";
const marioKartContainer = "_marioKartContainer_65b89_455";
const marioKartCompDescription = "_marioKartCompDescription_65b89_1";
const marioKartTitle = "_marioKartTitle_65b89_1";
const marioKartFormatLabel = "_marioKartFormatLabel_65b89_1";
const formatSelector = "_formatSelector_65b89_505";
const formatButton = "_formatButton_65b89_521";
const scoreTrackerContainer = "_scoreTrackerContainer_65b89_537";
const scoreTrackerFormContainer = "_scoreTrackerFormContainer_65b89_549";
const scoreTrackerTeamSubmitForm = "_scoreTrackerTeamSubmitForm_65b89_1";
const scoreTrackerScoreSubmitForm = "_scoreTrackerScoreSubmitForm_65b89_1";
const scoreTrackerTeamsContainer = "_scoreTrackerTeamsContainer_65b89_579";
const teamNameDisplay = "_teamNameDisplay_65b89_587";
const styles = {
  page,
  main,
  title,
  "left-side-nav": "_left-side-nav_65b89_1",
  marioKartContainer,
  marioKartCompDescription,
  marioKartTitle,
  marioKartFormatLabel,
  formatSelector,
  formatButton,
  scoreTrackerContainer,
  scoreTrackerFormContainer,
  scoreTrackerTeamSubmitForm,
  scoreTrackerScoreSubmitForm,
  scoreTrackerTeamsContainer,
  teamNameDisplay
};
function HomePage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: styles.title, children: /* @__PURE__ */ jsx("h1", { id: "HomeTitle", children: "Information about Bao Phung" }) }),
    /* @__PURE__ */ jsx("div", { className: styles.page, children: /* @__PURE__ */ jsxs("main", { className: styles.main, children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Hi everyone, this is the home page.  For those viewing this website, this is just a page about me going over some of the work I've done and all that good stuff.",
        /* @__PURE__ */ jsx("br", {}),
        "You can find specific sections on the navigation bar at the left side.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {})
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "I am planning on adding more content to this home page, as well as the other pages.  However, this is currently a work in progress (WIP).",
        /* @__PURE__ */ jsx("br", {}),
        "However, if you are interested in competitive Mario Kart, I have a dedicated Mario Kart page that helps keep track of team scores for various team formats. ",
        /* @__PURE__ */ jsx("br", {}),
        "I also plan on adding a performance tracker for Mario Kart World, although this is currently a work in progress."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { id: styles["left-side-nav"], children: /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/Projects", children: "Projects" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/About", children: "About Me" }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/MarioKart", children: "Mario Kart" }) })
    ] }) })
  ] });
}
function meta$2({}) {
  return [{
    title: "Bao Phung's Website"
  }, {
    name: "description",
    content: "Bao Phung Homepage"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(HomePage, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Mario Kart"
  }, {
    name: "description",
    content: "Bao Phung Homepage"
  }];
}
function FormatButton({
  format,
  onClick
}) {
  return /* @__PURE__ */ jsx("button", {
    className: styles.formatButton,
    onClick,
    children: format
  });
}
function FormatSelectorPage() {
  const navigate = useNavigate();
  function FormatButtonClick(format) {
    navigate(`/ScoreTracker`, {
      state: {
        format
      }
    });
  }
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsxs("div", {
      id: styles.marioKartFormatLabel,
      children: [/* @__PURE__ */ jsx("p", {
        children: "This is the Mario Kart page, mainly for setting up scores for a competitive match."
      }), /* @__PURE__ */ jsx("p", {
        children: "Click on one of the formats below to set up teams."
      }), /* @__PURE__ */ jsx("p", {
        children: "Note that the 8v8 and 12v12 formats will have 24 players, while the others will have 12 players by default."
      })]
    }), /* @__PURE__ */ jsxs("div", {
      className: styles.formatSelector,
      children: [/* @__PURE__ */ jsx(FormatButton, {
        format: "2v2",
        onClick: () => FormatButtonClick("2")
      }), /* @__PURE__ */ jsx(FormatButton, {
        format: "3v3",
        onClick: () => FormatButtonClick("3")
      }), /* @__PURE__ */ jsx(FormatButton, {
        format: "4v4",
        onClick: () => FormatButtonClick("4")
      }), /* @__PURE__ */ jsx(FormatButton, {
        format: "6v6",
        onClick: () => FormatButtonClick("6")
      }), /* @__PURE__ */ jsx(FormatButton, {
        format: "8v8",
        onClick: () => FormatButtonClick("8")
      }), /* @__PURE__ */ jsx(FormatButton, {
        format: "12v12",
        onClick: () => FormatButtonClick("12")
      })]
    })]
  });
}
const MarioKart = UNSAFE_withComponentProps(function MarioKartPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: styles.marioKartContainer,
    children: [/* @__PURE__ */ jsxs("div", {
      className: styles.title,
      children: [/* @__PURE__ */ jsx("h1", {
        id: styles.marioKartTitle,
        children: "Mario Kart"
      }), /* @__PURE__ */ jsxs("p", {
        children: [/* @__PURE__ */ jsx(Link, {
          to: "/",
          style: {
            "color": "cyan",
            "fontSize": "20px"
          },
          children: "Click Here"
        }), " to return to the home page."]
      }), /* @__PURE__ */ jsx("br", {})]
    }), /* @__PURE__ */ jsxs("div", {
      id: styles.marioKartCompDescription,
      children: [/* @__PURE__ */ jsx("h1", {
        style: {
          "fontSize": "30px"
        },
        children: "About Competitive Mario Kart"
      }), /* @__PURE__ */ jsx("p", {
        children: "Mario Kart can be played competitively, believe it or not.  With the advent of Mario Kart World and its groundbreaking mechanics, it comes as no surprise that players want to become the best at the game."
      }), /* @__PURE__ */ jsx("p", {
        children: "In fact, competitive Mario Kart has existed for a long time, with support for older classics such as Mario Kart Wii that still runs tournaments to this day. "
      }), /* @__PURE__ */ jsx("p", {
        children: "If you want to participate in competitive Mario Kart matches, please sign up on Mario Kart Central first."
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("p", {
        children: /* @__PURE__ */ jsxs("ul", {
          children: ["Link to the Mario Kart Central page below (click on 'Mario Kart Central'):", /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://mkcentral.com/en-us",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart Central"
            })
          })]
        })
      }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("p", {
        children: ["Then, you want to join a discord server for the Mario Kart game you wish to participate in.", /* @__PURE__ */ jsx("br", {}), "Note that you will need to be verified on whichever server you join, which is done via creating an account at Mario Kart Central.", /* @__PURE__ */ jsx("br", {}), "You can find more information about the verification process once you join your desired discord server.", /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsxs("ul", {
          children: ["List of competitive Mario Kart discords (click on one to join the discord server):", /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/WR6JKPn2v9",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart World"
            })
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/revmGkE",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart 8 Deluxe 150cc"
            })
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/dfdRkFu",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart 8 Deluxe 200cc"
            })
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/vYr3bQQHFY",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart Tour"
            })
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/cZZp9DdQ5e",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart 7"
            })
          }), /* @__PURE__ */ jsx("li", {
            children: /* @__PURE__ */ jsx(Link, {
              to: "https://discord.gg/mkw",
              target: "_blank",
              style: {
                "color": "cyan"
              },
              children: "Mario Kart Wii"
            })
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(FormatSelectorPage, {})]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MarioKart,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Score Tracker"
  }, {
    name: "description",
    content: "Bao Phung Homepage"
  }];
}
const ScoreTracker = UNSAFE_withComponentProps(function ScoreTrackerPage() {
  var _name, _score, _entries, _Team_instances, addPoints_fn;
  const location = useLocation();
  const {
    format
  } = location.state || {
    format: null
  };
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [allowTeamInput, setAllowTeamInput] = useState(true);
  const teamInputRef = useRef(null);
  const scoreInputRef = useRef(null);
  const [currentRace, setCurrentRace] = useState(1);
  const [currentPlacement, setCurrentPlacement] = useState(1);
  const maxPlayers = format === "8" || format === "12" ? 24 : 12;
  const [teams, setTeams] = useState([]);
  const [teamsCopy, setTeamsCopy] = useState([]);
  const [addFormVisible, setAddFormVisible] = useState(true);
  const [scoreFormVisible, setScoreFormVisible] = useState(false);
  class Team {
    // Constructor to initialize the team name and score
    constructor(name) {
      __privateAdd(this, _Team_instances);
      // Private properties for team name and score
      __privateAdd(this, _name);
      __privateAdd(this, _score);
      // Private property for number of available placement entries
      // Corresponds to the format # (if team format is 2v2, then there are 2 entries per team)
      __privateAdd(this, _entries);
      __privateSet(this, _name, name);
      __privateSet(this, _score, 0);
      __privateSet(this, _entries, parseInt(format));
    }
    // Getter for team name
    getName() {
      return __privateGet(this, _name);
    }
    // Getter for team score
    getScore() {
      return __privateGet(this, _score);
    }
    // Getter for the number of entries
    getEntries() {
      return __privateGet(this, _entries);
    }
    // Decrement the # of entries
    setEntry(placement) {
      if (__privateGet(this, _entries) > 0) {
        __privateMethod(this, _Team_instances, addPoints_fn).call(this, placement);
        __privateWrapper(this, _entries)._--;
        return true;
      }
      alert(`No more entries available for ${__privateGet(this, _name)}.`);
      return false;
    }
    // If we need to reset the # of entries for the next race
    resetEntries() {
      if (__privateGet(this, _entries) === 0) {
        __privateSet(this, _entries, parseInt(format));
      }
    }
  }
  _name = new WeakMap();
  _score = new WeakMap();
  _entries = new WeakMap();
  _Team_instances = new WeakSet();
  // Method to add placement points to the team score (basically the setter for the score)
  addPoints_fn = function(placement) {
    let pointPlacements;
    if (maxPlayers === 12) {
      pointPlacements = [15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    } else if (maxPlayers === 24) {
      pointPlacements = [15, 12, 10, 9, 9, 8, 8, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1];
    } else {
      return;
    }
    __privateSet(this, _score, __privateGet(this, _score) + pointPlacements[placement - 1]);
  };
  function AddTeamForm() {
    return /* @__PURE__ */ jsxs("form", {
      onSubmit: handleAddTeam,
      id: styles.scoreTrackerTeamSubmitForm,
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: "teamNameInput",
        children: "Enter Team Name:"
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        id: "teamNameInput",
        name: "teamNameInput",
        value: teamName,
        onChange: (e) => setTeamName(e.target.value),
        ref: teamInputRef,
        style: {
          backgroundColor: "white",
          color: "black"
        },
        required: true,
        autoFocus: true
      })]
    });
  }
  function AddScoreForm() {
    let placementString;
    if (currentPlacement === 1 || currentPlacement === 21) {
      placementString = "st";
    } else if (currentPlacement === 2 || currentPlacement === 22) {
      placementString = "nd";
    } else if (currentPlacement === 3 || currentPlacement === 23) {
      placementString = "rd";
    } else {
      placementString = "th";
    }
    return /* @__PURE__ */ jsxs("form", {
      onSubmit: handleAddScore,
      id: styles.scoreTrackerScoreSubmitForm,
      children: [/* @__PURE__ */ jsxs("label", {
        htmlFor: "teamScoreInput",
        children: ["Enter team for ", currentPlacement, placementString, " place: "]
      }), /* @__PURE__ */ jsx("input", {
        type: "text",
        id: "teamScoreInput",
        name: "score",
        value: teamName,
        onChange: (e) => setTeamName(e.target.value),
        ref: scoreInputRef,
        readOnly: !allowTeamInput,
        style: {
          backgroundColor: "white",
          color: "black"
        },
        required: true,
        autoFocus: true
      })]
    });
  }
  function handleAddTeam(event) {
    event.preventDefault();
    addTeam();
    setTeamName("");
  }
  function handleAddScore(event) {
    event.preventDefault();
    if (teamName === "" || teamName === null || teamName === void 0) {
      alert("Please enter a team.");
      return;
    }
    const teamIndex = teams.findIndex((team) => {
      var _a;
      return ((_a = team.getName().at(0)) == null ? void 0 : _a.toUpperCase()) === teamName.at(0).toUpperCase();
    });
    const teamCopyIndex = teamsCopy.findIndex((team) => {
      var _a;
      return team.getName().at(0).toUpperCase() === ((_a = teamName.at(0)) == null ? void 0 : _a.toUpperCase());
    });
    if (teamIndex === -1) {
      alert(`Team ${teamName} not found. Please enter an existing team.`);
      setTeamName("");
      return;
    }
    if (teams[teamIndex].getEntries() === 0) {
      alert(`Team ${teamName} has no more entries.`);
      setTeamName("");
      return;
    }
    teams[teamIndex].setEntry(currentPlacement);
    teamsCopy[teamCopyIndex].setEntry(currentPlacement);
    setCurrentPlacement(currentPlacement + 1);
    if (currentPlacement === maxPlayers) {
      setCurrentPlacement(1);
      setCurrentRace(currentRace + 1);
      for (let i = 0; i < teams.length; i++) {
        teams.at(i).resetEntries();
        teamsCopy.at(i).resetEntries();
      }
    }
    setTeamName("");
    teams.sort((a, b) => b.getScore() - a.getScore());
  }
  function addTeam() {
    if (teamName.trim().length > 10) {
      alert("The desired team cannot have more than 10 characters.");
      return;
    }
    if (teamName.trim().length === 0) {
      alert("Please enter a team (white space is not counted).");
      return;
    }
    for (let i = 0; i < teams.length; i++) {
      if (teams.at(i).getName().charAt(0).toUpperCase() === teamName.charAt(0).toUpperCase()) {
        alert(`A team with that tag (${teamName.charAt(0).toUpperCase()}) already exists.`);
        return;
      }
    }
    setTeams([...teams, new Team(teamName.trim())]);
  }
  useEffect(() => {
    const setFormat = async () => {
      if (format === void 0 || format === null || format !== "2" && format !== "3" && format !== "4" && format !== "6" && format !== "8" && format !== "12") {
        alert("No/Invalid format selected. Please go back and select a format.");
        navigate("/MarioKart");
        return;
      }
    };
    setFormat();
  }, []);
  useEffect(() => {
    if (addFormVisible && maxPlayers / parseInt(format) === teams.length) {
      alert("Maximum number of teams reached");
      setAddFormVisible(false);
      setScoreFormVisible(true);
      let temp = [];
      for (let i = 0; i < teams.length; i++) {
        temp.push(new Team(teams[i].getName()));
      }
      setTeamsCopy(temp);
    }
  }, [teams]);
  useEffect(() => {
    if (currentRace === 13) {
      alert("The mogi is over!");
      setAllowTeamInput(false);
    }
  }, [currentRace]);
  return format === void 0 || format === null || format !== "2" && format !== "3" && format !== "4" && format !== "6" && format !== "8" && format !== "12" ? (
    // If the format is not valid, display an error message
    /* @__PURE__ */ jsxs("div", {
      className: styles.scoreTrackerContainer,
      children: [/* @__PURE__ */ jsx("div", {
        className: styles.title,
        children: /* @__PURE__ */ jsx("h1", {
          id: styles.scoreTrackerTitle,
          children: "Score Tracker"
        })
      }), /* @__PURE__ */ jsx("div", {
        id: styles.scoreTrackerContent,
        children: /* @__PURE__ */ jsxs("p", {
          children: ["No/Invalid format selected. Please ", /* @__PURE__ */ jsx(Link, {
            to: "/MarioKart",
            children: "Click Here"
          }), " to go back and select a format."]
        })
      })]
    })
  ) : (
    // If the format is valid, display the score tracker
    /* @__PURE__ */ jsxs("div", {
      className: styles.scoreTrackerContainer,
      children: [/* @__PURE__ */ jsx("div", {
        className: styles.title,
        children: /* @__PURE__ */ jsxs("h1", {
          id: styles.scoreTrackerTitle,
          children: [format, "v", format, " Score Tracker"]
        })
      }), /* @__PURE__ */ jsxs("div", {
        id: styles.scoreTrackerContent,
        children: [/* @__PURE__ */ jsxs("p", {
          children: ["This is a page about the score tracker for the ", format, "v", format, " format."]
        }), /* @__PURE__ */ jsxs("p", {
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/MarioKart",
            children: "Click Here"
          }), " to return to the Mario Kart page."]
        }), /* @__PURE__ */ jsx("div", {
          className: styles.scoreTrackerTeamsContainer,
          children: /* @__PURE__ */ jsxs("div", {
            className: styles.teamNameDisplay,
            children: [currentRace <= 12 && maxPlayers / parseInt(format) === teams.length && /* @__PURE__ */ jsxs("p", {
              children: ["Race #", currentRace]
            }), currentRace > 12 && /* @__PURE__ */ jsx("p", {
              children: "Mogi is over!"
            }), /* @__PURE__ */ jsx("br", {}), teams.map((team, index) => /* @__PURE__ */ jsxs("span", {
              children: [team.getName(), " (", team.getScore(), ") ", index < teams.length - 1 ? " | " : ""]
            }, team.getName())), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("br", {}), teamsCopy !== void 0 && teamsCopy !== null && /* @__PURE__ */ jsxs(Fragment, {
              children: [maxPlayers / parseInt(format) === teams.length && /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx("p", {
                  children: "Number of entries: "
                }), /* @__PURE__ */ jsx("br", {})]
              }), teamsCopy.map((team, index) => /* @__PURE__ */ jsxs("span", {
                children: [team.getName(), " (", team.getEntries(), ") ", index < teams.length - 1 ? " | " : ""]
              }, index + teams.length))]
            })]
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: styles.scoreTrackerFormContainer,
          children: [addFormVisible && /* @__PURE__ */ jsx(AddTeamForm, {}), scoreFormVisible && /* @__PURE__ */ jsx(AddScoreForm, {})]
        })]
      })]
    })
  );
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ScoreTracker,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CC3Jv74A.js", "imports": ["/assets/chunk-NL6KNZEE-BnoZhxP3.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-0jOu4Jkf.js", "imports": ["/assets/chunk-NL6KNZEE-BnoZhxP3.js"], "css": ["/assets/root-Dy9PGCZT.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BSD8PwYD.js", "imports": ["/assets/chunk-NL6KNZEE-BnoZhxP3.js", "/assets/style.module-CK8-J01x.js"], "css": ["/assets/style-B-_8_5RF.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "Pages/MarioKart": { "id": "Pages/MarioKart", "parentId": "root", "path": "MarioKart", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/MarioKart-DrDO5DUr.js", "imports": ["/assets/chunk-NL6KNZEE-BnoZhxP3.js", "/assets/style.module-CK8-J01x.js"], "css": ["/assets/style-B-_8_5RF.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "Pages/ScoreTracker": { "id": "Pages/ScoreTracker", "parentId": "root", "path": "ScoreTracker", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/ScoreTracker-C3e6cUvJ.js", "imports": ["/assets/chunk-NL6KNZEE-BnoZhxP3.js", "/assets/style.module-CK8-J01x.js"], "css": ["/assets/style-B-_8_5RF.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2d2a80dc.js", "version": "2d2a80dc", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "Pages/MarioKart": {
    id: "Pages/MarioKart",
    parentId: "root",
    path: "MarioKart",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "Pages/ScoreTracker": {
    id: "Pages/ScoreTracker",
    parentId: "root",
    path: "ScoreTracker",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

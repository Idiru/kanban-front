import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Board from "./Board";
import MainButton from "./MainButton";
import Modal from "./ModalCreateBoard";
import { useKanban } from "./KanbanContext";
import { openModal } from "../redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setScreenSize } from "../redux/screenSizeSlice";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const data = {
  projects: [
    {
      id: 1,
      name: "Renault",
    },
    {
      id: 2,
      name: "Pierre Fabre",
    },
  ],
};

export default function PersistentDrawerLeft({ handleDarkTheme, darkTheme }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { boards } = useKanban();


  const isModalOpen = useSelector((state) => state.modal.open);
  const dispatch = useDispatch();

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const screenSize = useSelector((state) => state.screen.screenSize);

  const refresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    function handleResize() {
      dispatch(setScreenSize(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  //Toolbar arrow
  const [isUp, setIsUp] = useState(false);
  const svgRef = useRef(null);
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      // Appliquer immédiatement la rotation initiale sans transition
      svgRef.current.style.transform = `rotate(${isUp ? 0 : 180}deg)`;
      firstMount.current = false; // Marquer que le premier montage est passé
    } else {
      // Appliquer la transition après le premier montage
      svgRef.current.style.transform = `rotate(${isUp ? 0 : 180}deg)`;
    }
  }, [isUp]);

  const toggleArrow = () => {
    setIsUp(!isUp);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          "@media(max-width: 780px)": {
            display: "none",
          },
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            boxShadow: "none",
            borderBottom: darkTheme
              ? "1px solid var(--Borders-dark)"
              : "1px solid var(--Borders-light)",
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: darkTheme ? "var(--Dark-Grey)" : "var(--White)",
              color: "#000112",
            }}
          >
            <Typography
              sx={{ color: darkTheme ? "var(--White)" : "var(--Black)" }}
              variant="h6"
              noWrap
              component="div"
            >
              {boards[activeIndex].name}
            </Typography>
            <div className="toolbar-button">
              <MainButton text={"+ Add new column"} />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: darkTheme
                ? "1px solid var(--Borders-dark)"
                : "1px solid var(--Borders-light)",
            },
            ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
              backgroundColor: darkTheme ? "var(--Dark-Grey)" : "var(--White)",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader
            sx={{ justifyContent: "center", padding: "16px 40px 0 0" }}
          >
            <img
              className="logo"
              src={
                darkTheme
                  ? "./public/logo-dark.svg"
                  : "./public/logo.svg"
              }
              alt="logo"
              onClick={() => refresh()}
            />
          </DrawerHeader>
          <List className="draw-list">
            <span className="drawer-title">ALL BOARDS ({boards.length})</span>
            {boards.map((board, index) => (
              <ListItem
                key={board.id}
                disablePadding
                sx={{
                  width: activeIndex === index ? "90%" : "100%",
                  backgroundColor:
                    activeIndex === index
                      ? "var(--Main-Purple, #635FC7)"
                      : "none",
                  borderRadius:
                    activeIndex === index ? "0px 100px 100px 0px" : "0",
                }}
              >
                <ListItemButton
                  className="drawer-button"
                  onClick={() => handleListItemClick(index)}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="fluent_board-split-24-regular">
                      <path
                        id="Shape"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                        fill={
                          activeIndex === index
                            ? "var(--White, #FFF)"
                            : "var(--Medium-Grey, #828FA3)"
                        }
                      />
                    </g>
                  </svg>
                  <ListItemText
                    className="list-item"
                    primary={board.name}
                    sx={{
                      fontFeatureSettings: `"clig" off, "liga" off`,
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "15px",
                      fontWeight: "800",
                      paddingLeft: "12px",
                      color:
                        activeIndex === index
                          ? "var(--White, #FFF)"
                          : "var(--Medium-Grey, #828FA3)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding onClick={() => dispatch(openModal())}>
              <ListItemButton className="drawer-button">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="fluent_board-split-24-regular">
                    <path
                      id="Shape"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                      fill="#635fc7"
                    />
                  </g>
                </svg>
                <ListItemText
                  primary="+ Create a new board"
                  className="list-item"
                  sx={{
                    color: "var(--Medium-Grey, #828fa3)",
                    fontFeatureSettings: `"clig" off, "liga" off`,
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: "15px",
                    fontWeight: "700",
                    paddingLeft: "12px",
                    color: "var(--Main-Purple, #635fc7)",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <div
            className="dark-light-mode"
            style={{
              backgroundColor: darkTheme
                ? "var(--Very-Dark-Grey)"
                : "var(--Light-Grey)",
              color: "#000112",
            }}
          >
            <img
              className="sun-icon"
              src="./public/sun.svg"
              alt="sun-icon"
            />
            <Switch
              {...label}
              sx={{
                ".css-1yjjitx-MuiSwitch-track": {
                  backgroundColor: "var(--Main-Purple)",
                  opacity: "1",
                  width: "40px",
                  height: "20px",
                  flexShrink: "0",
                  borderRadius: "20px",
                },
                ".css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked":
                  {
                    color: "#FFFF",
                  },
                ".css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                  {
                    backgroundColor: "var(--Main-Purple)",
                    opacity: "1",
                  },
                ".css-jsexje-MuiSwitch-thumb": {
                  height: "14px",
                  width: "14px",
                },
                ".ss-byenzh-MuiButtonBase-root-MuiSwitch-switchBase": {
                  color: "#FFFF",
                  marginTop: "6px",
                  marginLeft: "5px",
                },
                "css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase": {
                  marginLeft: "5px",
                  color: "#FFFF",
                  marginTop: "6px",
                },

                ".css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase": {
                  color: "#FFFF",
                  marginTop: "6px",
                  marginLeft: "6px",
                },
              }}
              onClick={handleDarkTheme}
            />
            <img className="moon-icon" src="./public/moon.svg" alt="" />
          </div>
          <div onClick={handleDrawerClose} className="drawer-hide">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z"
                fill="#828FA3"
              />
            </svg>
            <p>Hide Sidebar</p>
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
            <Board />
        </Main>
        <div className="drawer-hide close" onClick={handleDrawerOpen}>
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z"
              fill="var(--White, #FFF)"
            />
          </svg>
        </div>
        <Modal open={isModalOpen} modalTitle="test" modalText="Test text" />
      </Box>

      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          borderBottom: darkTheme
            ? "1px solid var(--Borders-dark)"
            : "1px solid var(--Borders-light)",
          "@media(min-width: 780px)": { display: "none" },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: darkTheme ? "var(--Dark-Grey)" : "var(--White)",
            color: "#000112",
          }}
        >
          <img
            className="logo"
            src={
              darkTheme
                ? "./public/logo-dark.svg"
                : "./public/logo-mobile.svg"
            }
            alt="logo"
            onClick={() => refresh()}
          />
          <Typography
            sx={{
              color: darkTheme ? "var(--White)" : "var(--Black)",
              padding: "0 8px 0 16px",
            }}
            variant="h6"
            noWrap
            component="div"
          >
            {boards[activeIndex].name}
          </Typography>
          <svg
            onClick={toggleArrow}
            ref={svgRef}
            className="arrow-projects"
            width="12"
            height="8"
            viewBox="0 0 9 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              cursor: "pointer",
              transition: firstMount.current ? "none" : "transform 0.3s ease", // Applique la transition uniquement après le premier montage
            }}
          >
            <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
          </svg>
          <div className="toolbar-button mobile">
            <MainButton text={"+"} />
          </div>
        </Toolbar>
        <Board />
      </AppBar>
    </div>
  );
}

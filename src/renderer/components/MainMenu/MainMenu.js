// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Fragment } from "react";
// import Electron from "electron";
import { Link } from "@reach/router";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../i18n";

// import { version } from "../../../../package.json";
import WelcomeMenu from "./WelcomeMenu";
import EditorMenuItem from "./EditorMenuItem";
import FlashMenuItem from "./FlashMenuItem";
import KeyboardMenuItem from "./KeyboardSelectMenuItem";
import PreferencesMenuItem from "./PreferencesMenuItem";
import SoftwareUpdateMenuItem from "./SoftwareUpdateMenuItem";
import Dygma from "../../../assets/dygma.png";

import { history } from "../../routerHistory";
// import { darkTheme } from "../../../styles/darkTheme";

const styles = theme => ({
  drawer: {
    overflowX: "hidden",
    borderRight: "0"
  },
  version: {
    textAlign: "right",
    paddingTop: 20
  },
  sizeTransition: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: "1000ms"
    })
  },
  toolbarIcon: {
    backgroundImage: `url(${Dygma})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0",
    ...theme.mixins.toolbar
  },
  link: {
    textDecoration: "none"
  },
  menuItem: {
    // paddingLeft: theme.spacing.unit * 4
    backgroundColor: "inherit",
    paddingTop: "1.8em",
    paddingBottom: "1.8em"
  },
  menuIcon: {
    fontSize: "2em"
  },
  keyboardTitleLight: {
    display: "block",
    width: 350,
    margin: "0 auto",
    padding: "30px 20px 30px 35px",
    borderBottom: "1px solid silver",
    fontSize: 18,
    textAlign: "left",
    lineHeight: "150%",
    letterSpacing: "0.25em"
  },
  keyboardTitleDark: {
    display: "block",
    width: 350,
    margin: "0 auto",
    padding: "30px 20px 30px 35px",
    borderTop: "1px solid rgba(0, 0, 0, 0.87)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.87)",
    fontSize: 18,
    textAlign: "left",
    lineHeight: "150%",
    letterSpacing: "0.25em"
  }
});

function MainMenu({ classes, connected, pages, themeDark, drawerWidth }) {
  const currentPage = history.location.pathname,
    setCurrentPage = history.navigate;

  const homePage = connected
    ? pages.keymap
      ? "/editor"
      : "/welcome"
    : "/keyboard-select";

  return (
    <Drawer variant="permanent" border={0} classes={classes.drawer}>
      <div
        className={classes.sizeTransition}
        style={{
          width: drawerWidth,
          minWidth: `${drawerWidth}px !important`,
          overflow: "hidden"
        }}
      >
        <div
          className={classes.toolbarIcon}
          style={{ width: `${drawerWidth}px`, minHeight: `${drawerWidth}px` }}
        >
          <Link
            to={homePage}
            style={{
              textDecoration: "none",
              width: drawerWidth,
              height: drawerWidth
            }}
          />
        </div>
        <Link to="/welcome" className={classes.link}>
          <WelcomeMenu
            selected={currentPage == "/welcome"}
            userMenu={i18n.app.menu.userMenu}
            className={classes.menuItem}
            classIcon={classes.menuIcon}
            drawerWidth={drawerWidth}
            onClick={() => setCurrentPage("/welcome")}
          />
        </Link>
        <List className={classes.drawer}>
          {connected && (
            <Fragment>
              {pages.keymap && (
                <Link
                  to="/editor"
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <EditorMenuItem
                    selected={currentPage == "/editor"}
                    className={classes.menuItem}
                    classIcon={classes.menuIcon}
                    drawerWidth={drawerWidth}
                    onClick={() => setCurrentPage("/editor")}
                  />
                </Link>
              )}
              <Link to="/firmware-update" className={classes.link}>
                <FlashMenuItem
                  selected={currentPage == "/firmware-update"}
                  className={classes.menuItem}
                  classIcon={classes.menuIcon}
                  drawerWidth={drawerWidth}
                  onClick={() => setCurrentPage("/firmware-update")}
                  themeDark={themeDark}
                />
              </Link>
            </Fragment>
          )}
          <Link to="/keyboard-select" className={classes.link}>
            <KeyboardMenuItem
              className={classes.menuItem}
              keyboardSelectText={
                connected
                  ? i18n.app.menu.selectAnotherKeyboard
                  : i18n.app.menu.selectAKeyboard
              }
              classIcon={classes.menuIcon}
              drawerWidth={drawerWidth}
              selected={currentPage == "/keyboard-select"}
              onClick={() => setCurrentPage("/keyboard-select")}
            />
          </Link>
          <Link to="/preferences" className={classes.link}>
            <PreferencesMenuItem
              className={classes.menuItem}
              classIcon={classes.menuIcon}
              drawerWidth={drawerWidth}
              selected={currentPage == "/preferences"}
              onClick={() => setCurrentPage("/preferences")}
            />
          </Link>
          <div
            className={classes.link}
            onClick={event => event.stopPropagation()}
          >
            <SoftwareUpdateMenuItem
              className={classes.menuItem}
              keyboardSelectText={i18n.app.menu.softwareUpdate}
              classIcon={classes.menuIcon}
              drawerWidth={drawerWidth}
              selected={currentPage == "/software-update"}
              onClick={event => event.stopPropagation()}
              themeDark={themeDark}
            />
          </div>
        </List>
        {/* <ExitMenuItem
            className={classes.menuItem}
            classIcon={classes.menuIcon}
            drawerWidth={drawerWidth}
            onClick={() => Electron.remote.app.exit(0)}
          /> */}
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(MainMenu);

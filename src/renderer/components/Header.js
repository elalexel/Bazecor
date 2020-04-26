// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import React, { useState, Fragment } from "react";

import "../../api/keymap";
import "../../api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import menu from "../menu.png";
import menuWhite from "../menu-white.png";

import BoardMenu from "./BoardMenu";
import MainMenu from "./MainMenu/MainMenu";

const styles = theme => ({
  pageMenu: {
    marginLeft: theme.spacing.unit * 5,
    textTransform: "uppercase"
  },
  menuButton: {
    marginLeft: 22,
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  },
  navigation: {
    display: "flex",
    alignItems: "start",
    flexDirection: "column"
  },
  logo: {
    width: 17,
    height: 17,
    marginRight: 10
  },
  submenu: {
    display: "flex",
    alignItems: "center",
    margin: "0 0 0 15px",
    minHeight: 52
  },
  menuIcon: {
    width: 40
  }
});

function Header({
  classes,
  contextBar,
  connected,
  pages,
  device,
  theme,
  cancelContext,
  drawerWidth
}) {
  const [mainMenu, setMainMenuOpen] = useState(false);
  const [boardAnchor, setBoardMenuAnchor] = useState(null);

  function openMainMenu() {
    setMainMenuOpen(true);
  }

  function closeMainMenu() {
    setMainMenuOpen(false);
  }

  function closeBoardMenu() {
    setBoardMenuAnchor(null);
  }

  function contextOnClick() {
    if (contextBar) {
      cancelContext(true);
    } else {
      openMainMenu();
    }
  }

  return (
    <Fragment>
      <AppBar
        position="static"
        color={contextBar ? "secondary" : "inherit"}
        id="appbar"
        style={{
          height: `${drawerWidth}px`,
          paddingTop: "6px",
          marginLeft: `${drawerWidth}px`
        }}
      >
        <Toolbar variant="dense" className={classes.navigation}>
          <div className={classes.submenu}>
            <Typography
              variant="h6"
              className={classes.pageMenu}
              id="page-title"
            />
          </div>
        </Toolbar>
      </AppBar>
      <MainMenu
        connected={connected}
        pages={pages}
        open={mainMenu}
        closeMenu={closeMainMenu}
        themeDark={theme}
        drawerWidth={drawerWidth}
      />
    </Fragment>
  );
}

export default withStyles(styles)(Header);

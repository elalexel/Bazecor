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

import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GetAppIcon from "@material-ui/icons/GetApp";
import i18n from "../../i18n";

export default function SoftwareUpdateMenuItem({
  onClick,
  className,
  classIcon,
  drawerWidth
}) {
  return (
    <ListItem button onClick={onClick} className={className} disabled>
      <ListItemIcon style={{ margin: "0" }}>
        <GetAppIcon className={classIcon} />
      </ListItemIcon>
      {drawerWidth === "auto" ? (
        <ListItemText
          primary={i18n.app.menu.softwareUpdate}
          secondary={i18n.app.menu.comingSoon}
        />
      ) : (
        <></>
      )}
    </ListItem>
  );
}

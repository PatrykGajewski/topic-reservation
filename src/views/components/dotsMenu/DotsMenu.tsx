import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {MenuAction} from '../../private/roles/STUDENT/router/pages/ownedProjectList/components/table/models';
import {Props} from "./models/props.model";
import {Project} from "../../../models/project";

const ITEM_HEIGHT = 48;

export const DotsMenu = (props: Props<Project>) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={(e) => handleClose(e as React.MouseEvent<HTMLElement>)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {props.actions.map((option: MenuAction<Project>) => (
          <MenuItem
            key={option.id}
            selected={false}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              option.action(props.element);
              handleClose(e);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

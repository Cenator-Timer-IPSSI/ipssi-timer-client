//React ---
import React from "react";

//Material UI ---
import { IconButton, Tooltip } from "@material-ui/core";

//Icons ---
import HelpIcon from "@material-ui/icons/Help";

//Styles ---
import { S_customIconButton } from "./CustomIconButton-styles";

export default function CustomIconButton({
  icon = <HelpIcon />,
  action = f => f,
  tooltip = "",
  size = "small",
  isDisableRipple = true,
  isDisableFocusRipple = true,
  ariaLabel = "",
}) {
  const S = S_customIconButton();
  return (
    <Tooltip title={tooltip}>
      <IconButton
        className={S.rootCustomIconButton}
        onClick={action}
        size={size}
        disableRipple={isDisableRipple}
        disableFocusRipple={isDisableFocusRipple}
        aria-label={ariaLabel}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

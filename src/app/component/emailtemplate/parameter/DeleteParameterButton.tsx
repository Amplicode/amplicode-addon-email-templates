import {alpha, styled} from "@mui/material/styles";
import {Button} from "react-admin";
import ActionDelete from "@mui/icons-material/Delete";

import {ButtonProps} from "ra-ui-materialui";

export const DeleteParameterButton = (props: ButtonProps) => {
    return (
        <>
            <StyledButton {...props}>
                <ActionDelete/>
            </StyledButton>
        </>
    );
};

//Style is taken from DeleteWithUndoButton (React Admin)
const StyledButton = styled(Button, {
    name: "DeleteEmailTemplateParameterButton",
    overridesResolver: (_props, styles) => styles.root,
})(({theme}) => ({
    color: theme.palette.error.main,
    minWidth: "auto",
    "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.12),
        // Reset on mouse devices
        "@media (hover: none)": {
            backgroundColor: "transparent",
        },
    },
    "& .MuiButton-startIcon": {margin: "0px"}
}));
import {Button} from "react-admin";
import ContentCreate from "@mui/icons-material/Create";

import {ButtonProps} from "ra-ui-materialui";

export const EditParameterButton = (props: ButtonProps) => {
    return (
        <>
            <Button sx={{"& .MuiButton-startIcon": {margin: "0px"}, minWidth: "auto"}} {...props}>
                <ContentCreate/>
            </Button>
        </>
    );
};
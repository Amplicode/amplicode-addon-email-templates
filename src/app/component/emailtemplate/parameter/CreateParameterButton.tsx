import {Button} from "react-admin";
import ContentAdd from "@mui/icons-material/Add";

import {ButtonProps} from "ra-ui-materialui";

export const CreateParameterButton = (props: ButtonProps) => {
    return (
        <>
            <Button label="ra.action.create" {...props}>
                <ContentAdd/>
            </Button>
        </>
    );
};
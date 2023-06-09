import Typography from "@mui/material/Typography";
import {useTranslate} from "react-admin";

export const AccessDenied = () => {
    const translate = useTranslate()
    return (
        <>
        <Typography paddingTop="5em" paddingBottom="5em" variant="h6" textAlign="center">
            {translate("common.accessDenied")}
        </Typography>
        </>
    );
};
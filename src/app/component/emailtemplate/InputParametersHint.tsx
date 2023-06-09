import Alert from "@mui/material/Alert";
import {useTranslate} from "react-admin";
import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

export const InputParametersHint = () => {
    const translate = useTranslate();
    return (
        <>
            <Alert severity="info" sx={{marginTop: "8px"}}>
                <Typography variant="body2" display="inline"
                            dangerouslySetInnerHTML={{__html: translate("EmailTemplateEdit.inputParametersHint.mainText")}}/>
                <Typography variant="body2"
                            display="inline"
                            component={Link}
                            href="https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html#variables"
                            target="_blank">
                    {translate("EmailTemplateEdit.inputParametersHint.thymeleafDocs")}
                </Typography>
            </Alert>
        </>
    );
};
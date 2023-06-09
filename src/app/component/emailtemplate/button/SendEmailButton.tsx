import {Button, useRecordContext} from "react-admin";

import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import {Link} from "react-router-dom";
import {EmailTemplate} from "@amplicode/gql/graphql";

export const SendEmailButton = () => {
    const emailTemplate: EmailTemplate = useRecordContext();

    if (!emailTemplate) {
        return <div/>;
    }
    return (
        <>
            <Button
                component={Link}
                label="EmailTemplateList.sendEmail"
                to={`/sendEmail/${emailTemplate.id}`}
                onClick={event => event.stopPropagation()}>
                <ForwardToInboxIcon/>
            </Button>
        </>
    );
};
import {EmailTemplate} from "@amplicode/gql/graphql";
import {useRecordContext, useTranslate} from "react-admin";
import {useMediaQuery} from "@mui/material";

interface EmailTemplateTitleProps {
    create?: boolean
}

export const EmailTemplateTitle = ({create}: EmailTemplateTitleProps) => {
    const translate = useTranslate();
    const emailTemplate: EmailTemplate = useRecordContext();
    const isXsSmall = useMediaQuery((theme: any) => {
        return theme.breakpoints.down("sm");
    });

    if (create) {
        return <span>{translate("EmailTemplateCreate.title")}</span>;
    }

    // the record can be empty while loading
    return emailTemplate ?
        <span>{isXsSmall ? emailTemplate.name : translate("EmailTemplateEdit.title", {templateName: emailTemplate.name})}</span> : null;
};
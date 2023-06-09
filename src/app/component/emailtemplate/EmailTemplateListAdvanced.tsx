import { gql } from "@amplicode/gql";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  CreateButton,
  DeleteWithConfirmButton,
  EditButton, FilterButton,
  List,
  Pagination, RecordContextProvider,
  TextInput, TopToolbar, useAuthenticated, useListContext, usePermissions, useRedirect, useTranslate
} from "react-admin";
import {SendEmailButton} from "./button/SendEmailButton";
import {Card, CardContent, CardHeader} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {NoItems} from "../common/NoItems";
import {EmailTemplateAction, hasAccess} from "../../security";
import {AccessDenied} from "../common/AccessDenied";
import {ClearFilterButton} from "../common/ClearFilterButton";
import {SortButton} from "../common/SortButton";
import {
  getEmailTemplateRecordRepresentation
} from "../../../core/record-representation/getEmailTemplateRecordRepresentation";
const EMAIL_TEMPLATE_LIST =
  gql(`query emailTemplateList($sort: [EmailTemplateOrderByInput], $page: OffsetPageInput, $filter: EmailTemplateFilterInput) {
  emailTemplateList(sort: $sort, page: $page, filter: $filter) {
    content {
      id
      version
      name
      code
    }
    totalElements
  }
}`);

const DELETE_EMAIL_TEMPLATE = gql(
  `mutation deleteEmailTemplate($id: ID!) {deleteEmailTemplate(id: $id)}`
);

export const EmailTemplateListAdvanced = () => {
  useAuthenticated();

  const {isLoading: isPermissionsLoading, permissions} = usePermissions();

  const queryOptions = {
    meta: {
      query: EMAIL_TEMPLATE_LIST,
      resultDataPath: "content",
      paginationQueryParam: "page",
    },
  };

    if (isPermissionsLoading) {
        return <div/>;
    }

  const canView = hasAccess(EmailTemplateAction.EMAIL_TEMPLATE_VIEW, permissions);

  if (!canView) {
    return <AccessDenied/>;
  }

  const emailTemplateFilters = [
    <TextInput
      variant="standard"
      fullWidth={true}
      clearAlwaysVisible={true}
      name="EmailTemplateList.filter.nameOrCode"
      label="EmailTemplateList.filter.nameOrCode"
      source="nameOrCode" />];

  const canModify = hasAccess(EmailTemplateAction.EMAIL_TEMPLATE_CRUD, permissions);

  return (
    <List<ItemType> queryOptions={queryOptions}
                    actions={<EmailTemplateListActions filters={emailTemplateFilters} canModify={canModify}/>}
                    emptyWhileLoading={true}
                    pagination={<EmailTemplatePagination/>} perPage={12}
                    filters={emailTemplateFilters}
                    sx={{
                      backgroundColor: "transparent",
                      ".RaList-content": {boxShadow: "none", backgroundColor: "transparent"}
                    }} sort={{field: "name", order: "ASC"}}>
      <EmailTemplateCardGrid/>
    </List>
  );
};

interface EmailTemplateListActionsProps {
    filters: JSX.Element[]
    canModify: boolean
}

const EmailTemplateListActions = ({filters, canModify}: EmailTemplateListActionsProps) => {
    return <TopToolbar>
        <ClearFilterButton/>
        <FilterButton filters={filters} disableSaveQuery={true}/>
        <SortButton fields={["name", "code"]}/>
        {canModify && <CreateButton variant="contained"/>}
    </TopToolbar>;
};

const EmailTemplatePagination = () => <Pagination rowsPerPageOptions={[6, 12, 24]}/>;

const EmailTemplateCardGrid = () => {
    const {data, isLoading} = useListContext();
    const {isLoading: isPermissionsLoading, permissions} = usePermissions();

    const translate = useTranslate();
    const redirect = useRedirect();

    if (isLoading || isPermissionsLoading) {
        return <div/>;
    }

    if (!data || data.length === 0) {
        return <NoItems text="ra.navigation.no_results"/>;
    }

    const canModify = hasAccess(EmailTemplateAction.EMAIL_TEMPLATE_CRUD, permissions);
    const canSendEmail = hasAccess(EmailTemplateAction.EMAIL_TEMPLATE_SEND_EMAIL, permissions);
    return (
        <Grid container={true} spacing={1}>
            {data.map(emailTemplate => (
                <RecordContextProvider key={emailTemplate.id} value={emailTemplate}>
                    <Grid key={emailTemplate.id} item={true} xs={12} md={6} sm={12} lg={6} xl={4}>
                        <Card variant="outlined" sx={{
                            "&:hover": {
                                boxShadow: 3
                            },
                            "&:active": {
                                backgroundColor: "grey.100"
                            }
                        }} onClick={() => redirect(`/EmailTemplate/${emailTemplate.id}/show`)}>
                            <CardHeader title={<Typography variant="subtitle1" color="primary"
                                                           sx={{textDecoration: "none"}}
                                                           component={Link}
                                                           to={`/EmailTemplate/${emailTemplate.id}/show`}>
                                {getEmailTemplateRecordRepresentation(emailTemplate)}
                            </Typography>}/>
                            <CardContent sx={{paddingTop: "0", paddingBottom: "0"}}>
                                <Typography variant="subtitle2" display="inline">
                                    {`${translate("resources.EmailTemplate.fields.code")}: `}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" display="inline">
                                    {emailTemplate.code}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{paddingLeft: "12px"}}>
                                {canSendEmail && <SendEmailButton/>}
                                {canModify && <EditButton/>}
                                {canModify && <DeleteWithConfirmButton
                                    sx={{marginLeft: "auto"}}
                                    mutationMode="pessimistic"
                                    mutationOptions={{meta: {mutation: DELETE_EMAIL_TEMPLATE}}}
                                    confirmTitle="common.deleteTitle"
                                    confirmContent="common.deleteContent"
                                    translateOptions={{instanceName: emailTemplate.name}}
                                />}
                            </CardActions>
                        </Card>
                    </Grid>
                </RecordContextProvider>
            ))}
        </Grid>
    );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof EMAIL_TEMPLATE_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["emailTemplateList"];
/**
 * Type of single item
 */
type ItemType = { id: string } & Exclude<
  Exclude<ItemListType, null | undefined>["content"],
  undefined
>;

import {gql} from "@amplicode/gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {useCallback, useState} from "react";
import {
  Create,
  email,
  FileField,
  FileInput,
  required,
  TabbedForm,
  TextInput,
  useAuthenticated,
  useCreate,
  useNotify,
  usePermissions,
  useRedirect,
  WithRecord
} from "react-admin";
import {FieldValues, SubmitHandler} from "react-hook-form";
import {checkServerValidationErrors} from "../../../core/error/checkServerValidationError";
import {Editor as GrapesJsEditor} from "grapesjs";
import Grid from "@mui/material/Grid";
import {EmailTemplate, EmailTemplateParameter} from "@amplicode/gql/graphql";
import {EmailTemplateParameterManyInput} from "./input/EmailTemplateParameterManyInput";
import {HtmlContentInput} from "./input/HtmlContentInput";
import axios from "axios";
import {InputParametersHint} from "./InputParametersHint";
import {EmailTemplateTitle} from "./EmailTemplateTitle";
import {EmailManyInput} from "../common/input/EmailManyInput";
import {EmailTemplateAction, hasAccess} from "../../security";
import {AccessDenied} from "../common/AccessDenied";

const UPDATE_EMAIL_TEMPLATE = gql(`mutation updateEmailTemplate($input: EmailTemplateInput!) {
      updateEmailTemplate(input: $input) {
           id 
      }
     }`);

export const EmailTemplateCreateAdvanced = () => {
  useAuthenticated();

  const redirect = useRedirect();
  const notify = useNotify();
  const [create] = useCreate();
  const {isLoading: isPermissionsLoading, permissions} = usePermissions();

  const [grapesJsEditor, setGrapesJsEditor] = useState<GrapesJsEditor>();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const emailTemplate: { parameters?: any[], attachments?: any[] } = {
          ...data,
          parameters: [],
          attachments: []
        }; //email template without circular links
        const newAttachments: any[] = data["attachments"];

        data["parameters"]?.forEach((param: EmailTemplateParameter) => {
          param.emailTemplate = emailTemplate as EmailTemplate // remove circular links
        });
        data["attachments"] = null; //not send new attachments in GraphQL mutation

        const params = {data, meta: {mutation: UPDATE_EMAIL_TEMPLATE}};
        const options = {returnPromise: true};

        const createdTemplateId = await create("EmailTemplate", params, options)
          .then((createdTemplate: EmailTemplate) => {
            return createdTemplate.id;
          });

        if (createdTemplateId && newAttachments) {
          //upload new attachments via REST API
          await newAttachments.forEach(attachmentFile => {
            const formData = new FormData();
            formData.append("content", attachmentFile["rawFile"], attachmentFile["title"]);
            axios.post(`rest/emailtemplate/${createdTemplateId}/attachment`, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
          });
        }

        grapesJsEditor?.destroy();

        notify("ra.notification.created", {messageArgs: {smart_count: 1}});
        redirect("list", "EmailTemplate");
      } catch (response: any) {
        console.log("create failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
      return undefined;
    },
    [create, notify, redirect, grapesJsEditor]
  );

  if (isPermissionsLoading) {
    return <div/>;
  }

  const canCreate = hasAccess(EmailTemplateAction.EMAIL_TEMPLATE_CRUD, permissions);
  if (!canCreate) {
    return <AccessDenied/>;
  }

  return (
    <Create<ItemType> redirect="list" title={<EmailTemplateTitle create={true}/>}>
      <TabbedForm onSubmit={save}>
        <TabbedForm.Tab label="EmailTemplateEdit.general.title">
          <Grid container={true} spacing={0.5} overflow="auto">
            <Grid container={true} spacing={0.5} xs={12} sm={12} md={12} lg={3} xl={3} paddingTop={0} height="min-content">
              <Grid item={true} xs={12} sm={6} md={6} lg={12} xl={12}>
                <TextInput name="name" source="name" validate={required()} helperText={false} multiline={true}
                           minRows={2}
                           maxRows={2}
                           autoFocus={true} fullWidth={true}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={6} lg={12} xl={12}>
                <TextInput name="code" source="code" validate={required()} helperText={false} multiline={true}
                           minRows={2}
                           maxRows={2}
                           fullWidth={true}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={6} lg={12} xl={12}>
                <TextInput name="description" source="description" multiline={true} minRows={6} maxRows={6}
                           helperText={false}
                           fullWidth={true}/>
              </Grid>
              <Grid item={true} xs={12} sm={6} md={6} lg={12} xl={12}>
                <InputParametersHint/>
              </Grid>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={12} lg={9} xl={9}>
              <HtmlContentInput source="bodyContent" required={true}
                                onInit={grapesJsEditor => setGrapesJsEditor(grapesJsEditor)}/>
            </Grid>
          </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="EmailTemplateEdit.parameters">
          <Grid container={true}>
            <Grid item={true} xs={12} sm={12} md={12} lg={9} xl={8}>
              <EmailTemplateParameterManyInput source="parameters"/>
            </Grid>
          </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="EmailTemplateEdit.emailSending">
          <Grid container={true} spacing={1}>
            <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextInput name="subject" source="subject" helperText={false} fullWidth={true}/>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextInput name="from" source="from" validate={email()} fullWidth={true} helperText={false}/>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={4} xl={4} lg={4}>
              <EmailManyInput source="to" label="resources.EmailTemplate.fields.to"/>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={4} xl={4} lg={4}>
              <EmailManyInput source="cc" label="resources.EmailTemplate.fields.cc"/>
            </Grid>
            <Grid item={true} xs={12} sm={12} md={4} xl={4} lg={4}>
              <EmailManyInput source="bcc" label="resources.EmailTemplate.fields.bcc"/>
            </Grid>
          </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab label="EmailTemplateEdit.attachments">
          <FileInput name="attachments" source="attachments" label={false} multiple={true}>
            <WithRecord render={newAttachment => <FileField source="src" title="title"
                                                            download={newAttachment["title"]}/>}/>
          </FileInput>
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  )
};

const EMAIL_TEMPLATE_TYPE = gql(`query emailTemplate($id: ID!) {
  emailTemplate(id: $id) {
    id 
    version 
    name
    code 
    description 
    from 
    to 
    cc 
    bcc 
    subject 
    bodyContent
    parameters {
      id
      version
      name
      alias
      parameterType
      required
      orderNumber
    }
    attachments {
      id
      version
      name
    }
  }
}`);
/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof EMAIL_TEMPLATE_TYPE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["emailTemplate"], undefined>;

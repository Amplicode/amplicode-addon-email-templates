import { gql } from "@amplicode/gql";
import { EmailTemplate } from "@amplicode/gql/graphql";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import {
  Edit,
  FunctionField,
  Labeled,
  NumberInput,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useUpdate,
} from "react-admin";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { checkServerValidationErrors } from "../../../core/error/checkServerValidationError";
import { MAX_INT_VALUE, MIN_INT_VALUE } from "../../../core/format/constants";
import { formatNumber } from "../../../core/format/formatNumber";
import { parseNumber } from "../../../core/format/parseNumber";
import { getEmailTemplateAttachmentRecordRepresentation } from "../../../core/record-representation/getEmailTemplateAttachmentRecordRepresentation";
import { getEmailTemplateParameterRecordRepresentation } from "../../../core/record-representation/getEmailTemplateParameterRecordRepresentation";

const EMAIL_TEMPLATE = gql(`query emailTemplate($id: ID!) {
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
const UPDATE_EMAIL_TEMPLATE = gql(
  `mutation updateEmailTemplate($input: EmailTemplateInput!) {updateEmailTemplate(input: $input) {id}}`
);

export const EmailTemplateEditAdvanced = () => {
  const queryOptions = {
    meta: {
      query: EMAIL_TEMPLATE,
      resultDataPath: null,
    },
  };

  const redirect = useRedirect();
  const notify = useNotify();
  const [update] = useUpdate();

  const save: SubmitHandler<FieldValues> = useCallback(
    async (data: FieldValues) => {
      try {
        const params = { data, meta: { mutation: UPDATE_EMAIL_TEMPLATE } };
        const options = { returnPromise: true };

        await update("EmailTemplate", params, options);

        notify("ra.notification.updated", { messageArgs: { smart_count: 1 } });
        redirect("list", "EmailTemplate");
      } catch (response: any) {
        console.log("update failed with error", response);
        return checkServerValidationErrors(response, notify);
      }
      return undefined;
    },
    [update, notify, redirect]
  );

  return (
    <Edit<ItemType> mutationMode="pessimistic" queryOptions={queryOptions}>
      <SimpleForm onSubmit={save}>
        <NumberInput
          source="version"
          name="version"
          max={MAX_INT_VALUE}
          min={MIN_INT_VALUE}
          format={formatNumber}
          parse={parseNumber}
        />
        <TextInput source="name" name="name" />
        <TextInput source="code" name="code" />
        <TextInput source="description" name="description" />
        <TextInput source="from" name="from" />
        <TextInput source="to" name="to" />
        <TextInput source="cc" name="cc" />
        <TextInput source="bcc" name="bcc" />
        <TextInput source="subject" name="subject" />
        <TextInput source="bodyContent" name="bodyContent" />
        <Labeled label="Parameters">
          <FunctionField
            render={(record: EmailTemplate) =>
              record?.parameters?.length != null && record?.parameters?.length < 1
                ? "NOT SET"
                : record?.parameters
                    ?.map((item) => getEmailTemplateParameterRecordRepresentation(item))
                    .join(",")
            }
          />
        </Labeled>
        <Labeled label="Attachments">
          <FunctionField
            render={(record: EmailTemplate) =>
              record?.attachments?.length != null && record?.attachments?.length < 1
                ? "NOT SET"
                : record?.attachments
                    ?.map((item) => getEmailTemplateAttachmentRecordRepresentation(item))
                    .join(",")
            }
          />
        </Labeled>
      </SimpleForm>
    </Edit>
  );
};

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof EMAIL_TEMPLATE>;
/**
 * Type of the item loaded by executing the query
 */
type ItemType = { id: string } & Exclude<QueryResultType["emailTemplate"], undefined>;

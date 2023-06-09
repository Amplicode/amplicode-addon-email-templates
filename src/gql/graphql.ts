/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInteger: any;
  Date: any;
  DateTime: any;
  LocalDateTime: any;
  LocalTime: any;
  Long: any;
  Time: any;
  Timestamp: any;
  Url: any;
  Void: any;
};

export type EmailAttachment = {
  __typename?: "EmailAttachment";
  contentDisposition?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  message?: Maybe<EmailMessage>;
  name?: Maybe<Scalars["String"]>;
  version?: Maybe<Scalars["Int"]>;
};

export type EmailMessage = {
  __typename?: "EmailMessage";
  attachments?: Maybe<Array<Maybe<EmailAttachment>>>;
  bcc?: Maybe<Scalars["String"]>;
  bodyContentType?: Maybe<Scalars["String"]>;
  cc?: Maybe<Scalars["String"]>;
  contentText?: Maybe<Scalars["String"]>;
  createdDate?: Maybe<Scalars["LocalDateTime"]>;
  from?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  sendingDate?: Maybe<Scalars["LocalDateTime"]>;
  sendingStatus?: Maybe<SendingStatus>;
  subject?: Maybe<Scalars["String"]>;
  to?: Maybe<Scalars["String"]>;
  version?: Maybe<Scalars["Int"]>;
};

export type EmailMessageFilterInput = {
  createdDateAfter?: InputMaybe<Scalars["LocalDateTime"]>;
  createdDateBefore?: InputMaybe<Scalars["LocalDateTime"]>;
  from?: InputMaybe<Scalars["String"]>;
  sendingDateAfter?: InputMaybe<Scalars["LocalDateTime"]>;
  sendingDateBefore?: InputMaybe<Scalars["LocalDateTime"]>;
  sendingStatuses?: InputMaybe<Array<InputMaybe<SendingStatus>>>;
  subject?: InputMaybe<Scalars["String"]>;
  to?: InputMaybe<Scalars["String"]>;
};

export type EmailMessageOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<EmailMessageOrderByProperty>;
};

export enum EmailMessageOrderByProperty {
  CreatedDate = "CREATED_DATE",
  From = "FROM",
  SendingDate = "SENDING_DATE",
  SendingStatus = "SENDING_STATUS",
  Subject = "SUBJECT",
}

export type EmailMessageResultPage = {
  __typename?: "EmailMessageResultPage";
  content?: Maybe<Array<Maybe<EmailMessage>>>;
  totalElements: Scalars["Long"];
};

export type EmailTemplate = {
  __typename?: "EmailTemplate";
  attachments?: Maybe<Array<Maybe<EmailTemplateAttachment>>>;
  bcc?: Maybe<Array<Scalars["String"]>>;
  bodyContent: Scalars["String"];
  cc?: Maybe<Array<Scalars["String"]>>;
  code: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  from?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  parameters?: Maybe<Array<Maybe<EmailTemplateParameter>>>;
  subject?: Maybe<Scalars["String"]>;
  to?: Maybe<Array<Scalars["String"]>>;
  version?: Maybe<Scalars["Int"]>;
};

export type EmailTemplateAttachment = {
  __typename?: "EmailTemplateAttachment";
  emailTemplate?: Maybe<EmailTemplate>;
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  version?: Maybe<Scalars["Int"]>;
};

export type EmailTemplateAttachmentInput = {
  emailTemplate?: InputMaybe<EmailTemplateInput>;
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  version?: InputMaybe<Scalars["Int"]>;
};

export type EmailTemplateFilterInput = {
  name?: InputMaybe<Scalars["String"]>;
  nameOrCode?: InputMaybe<Scalars["String"]>;
};

export type EmailTemplateInput = {
  attachments?: InputMaybe<Array<InputMaybe<EmailTemplateAttachmentInput>>>;
  bcc?: InputMaybe<Array<Scalars["String"]>>;
  bodyContent: Scalars["String"];
  cc?: InputMaybe<Array<Scalars["String"]>>;
  code: Scalars["String"];
  description?: InputMaybe<Scalars["String"]>;
  from?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  parameters?: InputMaybe<Array<InputMaybe<EmailTemplateParameterInput>>>;
  subject?: InputMaybe<Scalars["String"]>;
  to?: InputMaybe<Array<Scalars["String"]>>;
  version?: InputMaybe<Scalars["Int"]>;
};

export type EmailTemplateJobModel = {
  __typename?: "EmailTemplateJobModel";
  bcc?: Maybe<Array<Scalars["String"]>>;
  cc?: Maybe<Array<Scalars["String"]>>;
  cronExpression: Scalars["String"];
  description: Scalars["String"];
  emailTemplate: EmailTemplate;
  endDate?: Maybe<Scalars["LocalDateTime"]>;
  from?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  parameterValues?: Maybe<Array<Maybe<EmailTemplateParameterValue>>>;
  startDate?: Maybe<Scalars["LocalDateTime"]>;
  state?: Maybe<JobState>;
  subject?: Maybe<Scalars["String"]>;
  to?: Maybe<Array<Scalars["String"]>>;
};

export type EmailTemplateJobModelInput = {
  bcc?: InputMaybe<Array<Scalars["String"]>>;
  cc?: InputMaybe<Array<Scalars["String"]>>;
  cronExpression: Scalars["String"];
  description: Scalars["String"];
  emailTemplate: EmailTemplateInput;
  endDate?: InputMaybe<Scalars["LocalDateTime"]>;
  from?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  parameterValues?: InputMaybe<
    Array<InputMaybe<EmailTemplateParameterValueInput>>
  >;
  startDate?: InputMaybe<Scalars["LocalDateTime"]>;
  state?: InputMaybe<JobState>;
  subject?: InputMaybe<Scalars["String"]>;
  to?: InputMaybe<Array<Scalars["String"]>>;
};

export type EmailTemplateJobOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<EmailTemplateJobOrderByProperty>;
};

export enum EmailTemplateJobOrderByProperty {
  CronExpression = "CRON_EXPRESSION",
  Description = "DESCRIPTION",
  EmailTemplateName = "EMAIL_TEMPLATE_NAME",
  EndDate = "END_DATE",
  StartDate = "START_DATE",
  State = "STATE",
}

export type EmailTemplateOrderByInput = {
  direction?: InputMaybe<SortDirection>;
  property?: InputMaybe<EmailTemplateOrderByProperty>;
};

export enum EmailTemplateOrderByProperty {
  Code = "CODE",
  Name = "NAME",
}

export type EmailTemplateParameter = {
  __typename?: "EmailTemplateParameter";
  alias: Scalars["String"];
  emailTemplate: EmailTemplate;
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  orderNumber?: Maybe<Scalars["Int"]>;
  parameterType: ParameterType;
  required?: Maybe<Scalars["Boolean"]>;
  version?: Maybe<Scalars["Int"]>;
};

export type EmailTemplateParameterInput = {
  alias: Scalars["String"];
  emailTemplate: EmailTemplateInput;
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  orderNumber?: InputMaybe<Scalars["Int"]>;
  parameterType: ParameterType;
  required?: InputMaybe<Scalars["Boolean"]>;
  version?: InputMaybe<Scalars["Int"]>;
};

export type EmailTemplateParameterValue = {
  __typename?: "EmailTemplateParameterValue";
  alias: Scalars["String"];
  bigDecimalValue?: Maybe<Scalars["BigDecimal"]>;
  booleanValue?: Maybe<Scalars["Boolean"]>;
  dateTimeValue?: Maybe<Scalars["LocalDateTime"]>;
  dateValue?: Maybe<Scalars["Date"]>;
  integerValue?: Maybe<Scalars["Int"]>;
  stringValue?: Maybe<Scalars["String"]>;
  timeValue?: Maybe<Scalars["LocalTime"]>;
  type: ParameterType;
};

export type EmailTemplateParameterValueInput = {
  alias: Scalars["String"];
  bigDecimalValue?: InputMaybe<Scalars["BigDecimal"]>;
  booleanValue?: InputMaybe<Scalars["Boolean"]>;
  dateTimeValue?: InputMaybe<Scalars["LocalDateTime"]>;
  dateValue?: InputMaybe<Scalars["Date"]>;
  integerValue?: InputMaybe<Scalars["Int"]>;
  stringValue?: InputMaybe<Scalars["String"]>;
  timeValue?: InputMaybe<Scalars["LocalTime"]>;
  type: ParameterType;
};

export type EmailTemplateResultPage = {
  __typename?: "EmailTemplateResultPage";
  content?: Maybe<Array<Maybe<EmailTemplate>>>;
  totalElements: Scalars["Long"];
};

export type EmailTemplateSendDtoInput = {
  bcc?: InputMaybe<Array<Scalars["String"]>>;
  cc?: InputMaybe<Array<Scalars["String"]>>;
  emailTemplateId: Scalars["String"];
  from?: InputMaybe<Scalars["String"]>;
  parameterValues?: InputMaybe<
    Array<InputMaybe<EmailTemplateParameterValueInput>>
  >;
  subject?: InputMaybe<Scalars["String"]>;
  to?: InputMaybe<Array<Scalars["String"]>>;
};

export enum JobState {
  Active = "ACTIVE",
  Paused = "PAUSED",
}

export type Mutation = {
  __typename?: "Mutation";
  activateEmailTemplateJob?: Maybe<Scalars["Void"]>;
  deactivateEmailTemplateJob?: Maybe<Scalars["Void"]>;
  deleteEmailTemplate?: Maybe<Scalars["Void"]>;
  deleteEmailTemplateJob?: Maybe<Scalars["Void"]>;
  sendEmail?: Maybe<Scalars["Void"]>;
  triggerEmailTemplateJob?: Maybe<Scalars["Void"]>;
  updateEmailTemplate: EmailTemplate;
  updateEmailTemplateJob: EmailTemplateJobModel;
};

export type MutationActivateEmailTemplateJobArgs = {
  id: Scalars["ID"];
};

export type MutationDeactivateEmailTemplateJobArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEmailTemplateArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEmailTemplateJobArgs = {
  id: Scalars["ID"];
};

export type MutationSendEmailArgs = {
  input: EmailTemplateSendDtoInput;
};

export type MutationTriggerEmailTemplateJobArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateEmailTemplateArgs = {
  input: EmailTemplateInput;
};

export type MutationUpdateEmailTemplateJobArgs = {
  input: EmailTemplateJobModelInput;
};

export type OffsetPageInput = {
  number: Scalars["Int"];
  size: Scalars["Int"];
};

export enum ParameterType {
  BigDecimal = "BIG_DECIMAL",
  Boolean = "BOOLEAN",
  Date = "DATE",
  DateTime = "DATE_TIME",
  Integer = "INTEGER",
  String = "STRING",
  Time = "TIME",
}

export type Query = {
  __typename?: "Query";
  emailMessage: EmailMessage;
  emailMessageList: EmailMessageResultPage;
  emailTemplate: EmailTemplate;
  emailTemplateJob: EmailTemplateJobModel;
  emailTemplateJobList: Array<Maybe<EmailTemplateJobModel>>;
  emailTemplateList: EmailTemplateResultPage;
  userInfo?: Maybe<UserInfo>;
  userPermissions?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryEmailMessageArgs = {
  id: Scalars["ID"];
};

export type QueryEmailMessageListArgs = {
  filter?: InputMaybe<EmailMessageFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<EmailMessageOrderByInput>>>;
};

export type QueryEmailTemplateArgs = {
  id: Scalars["ID"];
};

export type QueryEmailTemplateJobArgs = {
  id: Scalars["ID"];
};

export type QueryEmailTemplateJobListArgs = {
  sort?: InputMaybe<Array<InputMaybe<EmailTemplateJobOrderByInput>>>;
};

export type QueryEmailTemplateListArgs = {
  filter?: InputMaybe<EmailTemplateFilterInput>;
  page?: InputMaybe<OffsetPageInput>;
  sort?: InputMaybe<Array<InputMaybe<EmailTemplateOrderByInput>>>;
};

export enum SendingStatus {
  NotSent = "NOT_SENT",
  Sending = "SENDING",
  Sent = "SENT",
}

export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type UserInfo = {
  __typename?: "UserInfo";
  username?: Maybe<Scalars["String"]>;
};

export type UpdateEmailTemplateMutationVariables = Exact<{
  input: EmailTemplateInput;
}>;

export type UpdateEmailTemplateMutation = {
  __typename?: "Mutation";
  updateEmailTemplate: { __typename?: "EmailTemplate"; id?: string | null };
};

export type EmailTemplateQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type EmailTemplateQuery = {
  __typename?: "Query";
  emailTemplate: {
    __typename?: "EmailTemplate";
    id?: string | null;
    version?: number | null;
    name: string;
    code: string;
    description?: string | null;
    from?: string | null;
    to?: Array<string> | null;
    cc?: Array<string> | null;
    bcc?: Array<string> | null;
    subject?: string | null;
    bodyContent: string;
    parameters?: Array<{
      __typename?: "EmailTemplateParameter";
      id?: string | null;
      version?: number | null;
      name: string;
      alias: string;
      parameterType: ParameterType;
      required?: boolean | null;
      orderNumber?: number | null;
    } | null> | null;
    attachments?: Array<{
      __typename?: "EmailTemplateAttachment";
      id?: string | null;
      version?: number | null;
      name: string;
    } | null> | null;
  };
};

export type EmailTemplateListQueryVariables = Exact<{
  sort?: InputMaybe<
    | Array<InputMaybe<EmailTemplateOrderByInput>>
    | InputMaybe<EmailTemplateOrderByInput>
  >;
  page?: InputMaybe<OffsetPageInput>;
  filter?: InputMaybe<EmailTemplateFilterInput>;
}>;

export type EmailTemplateListQuery = {
  __typename?: "Query";
  emailTemplateList: {
    __typename?: "EmailTemplateResultPage";
    totalElements: any;
    content?: Array<{
      __typename?: "EmailTemplate";
      id?: string | null;
      version?: number | null;
      name: string;
      code: string;
    } | null> | null;
  };
};

export type DeleteEmailTemplateMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteEmailTemplateMutation = {
  __typename?: "Mutation";
  deleteEmailTemplate?: any | null;
};

export const UpdateEmailTemplateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateEmailTemplate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EmailTemplateInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEmailTemplate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateEmailTemplateMutation,
  UpdateEmailTemplateMutationVariables
>;
export const EmailTemplateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "emailTemplate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "emailTemplate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "code" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "from" } },
                { kind: "Field", name: { kind: "Name", value: "to" } },
                { kind: "Field", name: { kind: "Name", value: "cc" } },
                { kind: "Field", name: { kind: "Name", value: "bcc" } },
                { kind: "Field", name: { kind: "Name", value: "subject" } },
                { kind: "Field", name: { kind: "Name", value: "bodyContent" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "parameters" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "version" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "alias" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "parameterType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "required" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "orderNumber" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attachments" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "version" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<EmailTemplateQuery, EmailTemplateQueryVariables>;
export const EmailTemplateListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "emailTemplateList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "EmailTemplateOrderByInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "OffsetPageInput" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "filter" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "EmailTemplateFilterInput" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "emailTemplateList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "page" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "filter" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "content" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "version" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "totalElements" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EmailTemplateListQuery,
  EmailTemplateListQueryVariables
>;
export const DeleteEmailTemplateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteEmailTemplate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteEmailTemplate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteEmailTemplateMutation,
  DeleteEmailTemplateMutationVariables
>;

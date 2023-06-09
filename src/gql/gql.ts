/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation updateEmailTemplate($input: EmailTemplateInput!) {\n      updateEmailTemplate(input: $input) {\n           id \n      }\n     }":
    types.UpdateEmailTemplateDocument,
  "query emailTemplate($id: ID!) {\n  emailTemplate(id: $id) {\n    id \n    version \n    name\n    code \n    description \n    from \n    to \n    cc \n    bcc \n    subject \n    bodyContent\n    parameters {\n      id\n      version\n      name\n      alias\n      parameterType\n      required\n      orderNumber\n    }\n    attachments {\n      id\n      version\n      name\n    }\n  }\n}":
    types.EmailTemplateDocument,
  "mutation updateEmailTemplate($input: EmailTemplateInput!) {updateEmailTemplate(input: $input) {id}}":
    types.UpdateEmailTemplateDocument,
  "query emailTemplateList($sort: [EmailTemplateOrderByInput], $page: OffsetPageInput, $filter: EmailTemplateFilterInput) {\n  emailTemplateList(sort: $sort, page: $page, filter: $filter) {\n    content {\n      id\n      version\n      name\n      code\n    }\n    totalElements\n  }\n}":
    types.EmailTemplateListDocument,
  "mutation deleteEmailTemplate($id: ID!) {deleteEmailTemplate(id: $id)}":
    types.DeleteEmailTemplateDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation updateEmailTemplate($input: EmailTemplateInput!) {\n      updateEmailTemplate(input: $input) {\n           id \n      }\n     }"
): (typeof documents)["mutation updateEmailTemplate($input: EmailTemplateInput!) {\n      updateEmailTemplate(input: $input) {\n           id \n      }\n     }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query emailTemplate($id: ID!) {\n  emailTemplate(id: $id) {\n    id \n    version \n    name\n    code \n    description \n    from \n    to \n    cc \n    bcc \n    subject \n    bodyContent\n    parameters {\n      id\n      version\n      name\n      alias\n      parameterType\n      required\n      orderNumber\n    }\n    attachments {\n      id\n      version\n      name\n    }\n  }\n}"
): (typeof documents)["query emailTemplate($id: ID!) {\n  emailTemplate(id: $id) {\n    id \n    version \n    name\n    code \n    description \n    from \n    to \n    cc \n    bcc \n    subject \n    bodyContent\n    parameters {\n      id\n      version\n      name\n      alias\n      parameterType\n      required\n      orderNumber\n    }\n    attachments {\n      id\n      version\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation updateEmailTemplate($input: EmailTemplateInput!) {updateEmailTemplate(input: $input) {id}}"
): (typeof documents)["mutation updateEmailTemplate($input: EmailTemplateInput!) {updateEmailTemplate(input: $input) {id}}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "query emailTemplateList($sort: [EmailTemplateOrderByInput], $page: OffsetPageInput, $filter: EmailTemplateFilterInput) {\n  emailTemplateList(sort: $sort, page: $page, filter: $filter) {\n    content {\n      id\n      version\n      name\n      code\n    }\n    totalElements\n  }\n}"
): (typeof documents)["query emailTemplateList($sort: [EmailTemplateOrderByInput], $page: OffsetPageInput, $filter: EmailTemplateFilterInput) {\n  emailTemplateList(sort: $sort, page: $page, filter: $filter) {\n    content {\n      id\n      version\n      name\n      code\n    }\n    totalElements\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "mutation deleteEmailTemplate($id: ID!) {deleteEmailTemplate(id: $id)}"
): (typeof documents)["mutation deleteEmailTemplate($id: ID!) {deleteEmailTemplate(id: $id)}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

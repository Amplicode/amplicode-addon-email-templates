import { EmailTemplateParameter } from "../../gql/graphql";

export function getEmailTemplateParameterRecordRepresentation(
  entityInstance?: Partial<EmailTemplateParameter> | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}

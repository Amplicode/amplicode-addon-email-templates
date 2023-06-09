import { EmailTemplateAttachment } from "../../gql/graphql";

export function getEmailTemplateAttachmentRecordRepresentation(
  entityInstance?: Partial<EmailTemplateAttachment> | null
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

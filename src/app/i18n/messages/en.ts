import englishMessages from "ra-language-english";
import {TranslationMessages} from "react-admin";

export const en: TranslationMessages = {
    ...englishMessages,
    resources: {
        EmailTemplate: {
            name: "Email template |||| Email templates",
            fields: {
                name: "Name",
                code: "Code",
                description: "Description",
                from: "From",
                to: "To",
                cc: "Cc",
                bcc: "Bcc",
                subject: "Subject",
                bodyContent: "Content",
                parameters: "Parameters",
                createdDate: "Created at",
                createdBy: "Created by",
                lastModifiedDate: "Last modified at",
                lastModifiedBy: "Last modified by",
            },
        },
        EmailTemplateParameter: {
            name: "Input parameter |||| Input parameters",
            fields: {
                name: "Name",
                alias: "Alias",
                required: "Required",
                parameterType: "Type"
            },
            ParameterType: {
                string: "String",
                date: "Date",
                dateTime: "Date and time",
                time: "Time",
                boolean: "Boolean",
                integer: "Integer",
                bigDecimal: "Decimal"
            },
            empty: "No Input parameters yet.",
            invite: "Do you want to add one?"
        },
        EmailMessage: {
            name: "Email message |||| Email history",
            fields: {
                subject: "Subject",
                from: "From",
                to: "To",
                cc: "Cc",
                bcc: "Bcc",
                sendingStatus: "Status",
                sendingDate: "Sending date",
                createdDate: "Creation date",
                bodyContentType: "Content type",
                contentText: "Content",
                attachments: "Attachments"
            },
            SendingStatus: {
                notSent: "Not sent",
                sending: "Sending",
                sent: "Sent"
            }
        },
        EmailTemplateJob: {
            name: "Email scheduled task |||| Email scheduler",
            fields: {
                description: "Description",
                cronExpression: "Cron expression",
                startDate: "Start date",
                endDate: "End date",
                state: "State",
                emailTemplate: "Email template",
                subject: "Subject",
                from: "From",
                to: "To",
                cc: "Cc",
                bcc: "Bcc",
                parameterValues: "Parameter values"
            },
            empty: "No Email scheduled tasks yet.",
            JobState: {
                active: "Active",
                paused: "Paused"
            }
        }
    },
    EmailTemplateList: {
        sendEmail: "Send email",
        filter: {
            nameOrCode: "Name or code"
        },
        copy: {
            success: "Email template '%{sourceEmailTemplate}' copied",
            error: "Unable to copy email template '%{sourceEmailTemplate}'",
            action: "Copy"
        }
    },
    SendEmailScreen: {
        title: "Send email for template %{emailTemplateName}",
        emailInfo: "Email info",
        inputParameters: "Input parameters",
        send: "Send",
        viewTemplate: "View template"
    },
    EmailTemplateCreate: {
        title: "Create Email template"
    },
    EmailTemplateEdit: {
        title: "Email template %{templateName}",
        general: {
            title: "General"
        },
        parameters: "Input parameters",
        emailSending: "Email sending",
        attachments: "Attachments",
        inputParametersHint: {
            mainText: `You can declare input parameters in the HTML editor using the following syntax: <strong>\${inputParameterAlias}</strong>. <br/>
                See more examples in `,
            thymeleafDocs: "Thymeleaf docs."
        },
        auditGroup: {
            title: "Creation and last modified"
        }
    },
    InputParameterEditDialog: {
        title: {
            create: "Create input parameter",
            edit: "Edit input parameter"
        },
        validation: {
            aliasRegexp: "Must match a specific format (regexp): [a-zA-Z0-9_]+",
            aliasDuplicate: "Input parameter with the same alias already exists"
        }
    },
    EmailTemplateShow: {
        noInputParameters: "No input parameters",
        noAttachments: "No attachments"
    },
    EmailHistory: {
        viewEmailContent: "View content"
    },
    EmailHistoryList: {
        filter: {
            to: "To",
            from: "From",
            subject: "Subject",
            createdDateBefore: "Created before",
            createdDateAfter: "Created after",
            sendingDateBefore: "Sent before",
            sendingDateAfter: "Sent after",
            sendingStatuses: "Status"
        }
    },
    EmailHistoryShow: {
        title: "Email message %{emailMessageSubject}",
        mainTab: "General",
        bodyContentTab: "Body content"
    },
    EmailTemplateJobList: {
        activate: {
            button: "Activate",
            success: "'%{jobDescription}' successfully activated",
            error: "Unable to activate '%{jobDescription}'"
        },
        deactivate: {
            button: "Deactivate",
            success: "'%{jobDescription}' successfully deactivated",
            error: "Unable to deactivate '%{jobDescription}'"
        },
        trigger: {
            button: "Execute now",
            success: "'%{jobDescription}' successfully triggered ",
            error: "Unable to trigger '%{jobDescription}'"
        }
    },
    EmailTemplateJobCreate: {
        title: "Create Email scheduled task"
    },
    EmailTemplateJobEdit: {
        title: "Email scheduled task %{jobDescription}",
        saveAndActivate: "Save and activate",
        general: {
            title: "General",
            helpText: {
                cronExpression: `Cron expression consists of 6 or 7 fields separated by white spaces: second, minute, hour, day, month, day of a week and year (optionally).  Examples: 
                    <ul> 
                       <li>0 0/5 * ? * * - fires every 5 minutes</li>
                       <li>0 0 8-10 ? * * - fires at 8, 9 and 10 o'clock every day</li>
                       <li>0 10,44 14 ? 3 WED - fires at 2:10 PM and at 2:44 PM every Wednesday in the month of March</li>
                       <li>0 15 10 ? * 6#3 - fires at 10:15 AM on the third Friday of every month</li>
                       <li>0 0 0 25 12 ? - fires every Christmas at midnight</li>
                       </ul>
                See more examples in `,
                quartzDocs: "Quartz docs."
            }
        },
        inputParameters: "Input parameters",
        emailSending: "Email sending"
    },
    notification: {
        emailSent: "Email \"%{subject}\" successfully sent",
        emailNotSent: "Email sending failed"
    },
    HtmlContentInput: {
        exportDialog: {
            title: "Source HTML",
            exportButton: "Export to ZIP",
            saveChangesButton: "Save"
        },
        importDialog: {
            title: "Import HTML",
            okButton: "Import"
        },
        clearCanvasDialog: {
            title: "Clear canvas",
            content: "Are you sure you want to clear the canvas?"
        }
    },
    common: {
        deleteTitle: "Delete %{name} \"%{instanceName}\"",
        deleteContent: "Are you sure you want to delete this item?",
        validation: {
            invalidCron: "Invalid Cron expression",
            invalidEndDate: "End date should be later than start date"
        },
        accessDenied: "Access denied",
        clearFilter: "Clear filter",
        sortBy: "Sort by",
        editTitle: "%{name} %{recordRepresentation}",
        actions : {
            ok: "OK"
        }
    },
    EmailManyInput: {
        helperText: "Input an email and press \"Enter\" to add a value",
        placeholder: "Add email",
        validation: {
            invalidEmail: "Invalid email"
        }
    }
};
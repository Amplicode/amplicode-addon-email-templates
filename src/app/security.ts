export const FULL_ACCESS = "ROLE_FULL_ACCESS";
export const EMAIL_TEMPLATE_READ = "ROLE_EMAIL_TEMPLATE_READ";
export const EMAIL_TEMPLATE_WRITE = "ROLE_EMAIL_TEMPLATE_WRITE";
export const EMAIL_TEMPLATE_SEND = "ROLE_EMAIL_TEMPLATE_SEND";

export const EMAIL_MESSAGE_READ = "ROLE_EMAIL_MESSAGE_READ";

export const EMAIL_TEMPLATE_JOB_READ = "ROLE_EMAIL_TEMPLATE_JOB_READ";
export const EMAIL_TEMPLATE_JOB_WRITE = "ROLE_EMAIL_TEMPLATE_JOB_WRITE";


/**
 * Secured actions available in email templates add-on.
 */
export enum EmailTemplateAction {
    /**
     * View email template list or email template details
     */
    EMAIL_TEMPLATE_VIEW,
    /**
     * Create, update or delete email template
     */
    EMAIL_TEMPLATE_CRUD,
    /**
     * Send email by email template
     */
    EMAIL_TEMPLATE_SEND_EMAIL,
    /**
     * View Email history and email message details
     */
    EMAIL_HISTORY_VIEW,
    /**
     * View email template jobs and email template job details
     */
    EMAIL_TEMPLATE_JOB_VIEW,
    /**
     * Create, update or delete email template job
     */
    EMAIL_TEMPLATE_JOB_CRUD,
}

const hasRole = (role: string, permissions?: string[]) => {
    const index = permissions?.indexOf(role);
    return index !== undefined && index !== -1;
}

/**
 * Returns secured action is available or not.
 * @param action user action like view email templates, CRUD action etc.
 * @param permissions user roles
 *
 * @see EmailTemplateAction
 */
export const hasAccess = (action: EmailTemplateAction, permissions?: string[]) => {
    if (!permissions) {
        return false;
    }

    const hasFullAccess = hasRole(FULL_ACCESS, permissions);

    if (hasFullAccess) {
        return true;
    }

    switch (action) {
        case EmailTemplateAction.EMAIL_TEMPLATE_VIEW:
            return hasRole(EMAIL_TEMPLATE_WRITE, permissions) || hasRole(EMAIL_TEMPLATE_READ, permissions);
        case EmailTemplateAction.EMAIL_TEMPLATE_CRUD:
            return hasRole(EMAIL_TEMPLATE_WRITE, permissions);
        case EmailTemplateAction.EMAIL_TEMPLATE_SEND_EMAIL:
            return hasRole(EMAIL_TEMPLATE_SEND, permissions);
        case EmailTemplateAction.EMAIL_HISTORY_VIEW:
            return hasRole(EMAIL_MESSAGE_READ, permissions);
        case EmailTemplateAction.EMAIL_TEMPLATE_JOB_CRUD:
            return hasRole(EMAIL_TEMPLATE_JOB_WRITE, permissions);
        case EmailTemplateAction.EMAIL_TEMPLATE_JOB_VIEW:
            return hasRole(EMAIL_TEMPLATE_JOB_WRITE, permissions) || hasRole(EMAIL_TEMPLATE_JOB_READ, permissions);
    }

    return false;
}



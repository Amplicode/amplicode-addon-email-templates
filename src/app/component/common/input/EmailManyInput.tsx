import {required as requiredValidator, useInput, useNotify, useTranslate} from "react-admin";
import TextField from "@mui/material/TextField";

import {useCallback} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";

const EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface EmailManyInputProps {
    source: string
    required?: boolean
    label?: string
}

/*
   Allows to input multiple emails.
 */
export const EmailManyInput = ({source, required, label}: EmailManyInputProps) => {
    const {
        field, fieldState: {isTouched, invalid, error},
        formState: {isSubmitted},
    } = useInput({
        source: source, validate: required ? requiredValidator() : undefined
    });
    const notify = useNotify();

    const handleDelete = useCallback((emailIndex: number) => {
        const newValues = field.value?.filter((_value: string, index: number) => index !== emailIndex);
        field.onChange(newValues);
    }, [field]);
    const translate = useTranslate();

    const handleChange = useCallback((_event: React.SyntheticEvent, value: string[]) => {
        const invalidEmails: string[] = [];
        const correctEmails: string[] = [];

        value.forEach(email => {
            const isValidEmail = EMAIL_REGEX.test(email);
            if (isValidEmail) {
                correctEmails.push(email);
            } else {
                invalidEmails.push(email);
            }
        });

        if (invalidEmails && invalidEmails.length > 0) {
            notify("EmailManyInput.validation.invalidEmail", {type: "warning"});
        }
        field.onChange(correctEmails);
    }, [notify, field]);

    const getLabel = () => {
        if (!label) {
            return "";
        }
        const translatedLabel = translate(label);
        return required ? translatedLabel + " *" : translatedLabel;
    };

    return (
        <>
            <Autocomplete
                fullWidth={true}
                multiple={true}
                options={[]}
                openOnFocus={false}
                freeSolo={true}
                defaultValue={field.value ? field.value : []}
                value={field.value ? field.value : []}
                onChange={handleChange}
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        <Chip
                            label={option}
                            {...getTagProps({index})}
                            onDelete={() => handleDelete(index)}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        fullWidth={true}
                        label={getLabel()}
                        error={(isTouched || isSubmitted) && invalid}
                        helperText={(isTouched || isSubmitted) && invalid ? error?.message : translate("EmailManyInput.helperText")}
                        placeholder={translate("EmailManyInput.placeholder")}
                    />
                )}
            />
        </>
    );
};
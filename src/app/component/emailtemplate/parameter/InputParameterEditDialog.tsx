import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CancelIcon from "@mui/icons-material/Cancel";
import {
    AutocompleteInput,
    BooleanInput,
    Button,
    Form,
    regex,
    required,
    SaveButton,
    TextInput,
    useTranslate
} from "react-admin";
import {EmailTemplateParameter, ParameterType} from "@amplicode/gql/graphql";
import {FieldValues} from "react-hook-form";

import {PARAMETER_CHOICES} from "./constants";
import DoneIcon from "@mui/icons-material/Done";

interface InputParameterEditDialogProps {
    open: boolean,
    handleSubmit: (inputParameter: EmailTemplateParameter) => void,
    handleClose: () => void,
    inputParameter?: EmailTemplateParameter | null,
    parameters: EmailTemplateParameter[]
}

export const InputParameterEditDialog = ({
                                             open,
                                             handleSubmit,
                                             handleClose,
                                             inputParameter,
                                             parameters
                                         }: InputParameterEditDialogProps) => {
    const translate = useTranslate();

    const onSubmit = (fieldValues: FieldValues) => {
        const parameter = {
            ...fieldValues,
            id: inputParameter ? inputParameter.id : null,
            version: inputParameter ? inputParameter.version : null
        }
        handleSubmit(parameter as EmailTemplateParameter);
    }

    const validateAliasRegexp = regex(/^\S+$/, translate("InputParameterEditDialog.validation.aliasRegexp"));
    const validateUniqueAlias = ((newAlias: string) => {
        if (parameters && parameters.length > 0) {
            const orderNumber = inputParameter ? inputParameter.orderNumber : parameters[parameters.length - 1].orderNumber!! + 1;
            const duplicateParameter = parameters.find(param => {
                return param.alias === newAlias && (!inputParameter || param.orderNumber !== orderNumber)
            });

            if (duplicateParameter) {
                return translate("InputParameterEditDialog.validation.aliasDuplicate");
            }
        }
        return undefined;
    });

    const validateAlias = [required(), validateAliasRegexp, validateUniqueAlias];
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>
                    {inputParameter ? translate("InputParameterEditDialog.title.edit") : translate("InputParameterEditDialog.title.create")}
                </DialogTitle>
                <DialogContent>
                    <Form id="inputParameterForm"
                          defaultValues={inputParameter ? inputParameter : {
                              parameterType: ParameterType.String,
                              required: false,
                              orderNumber: parameters && parameters.length > 0 ?
                                  parameters[parameters.length - 1].orderNumber!! + 1 : 0
                          }}
                          record={{}}
                          onSubmit={onSubmit}>
                        <TextInput source="name" name="name"
                                   label="resources.EmailTemplateParameter.fields.name"
                                   fullWidth={true}
                                   validate={required()}
                                   helperText={false}/>
                        <TextInput source="alias" name="alias"
                                   label="resources.EmailTemplateParameter.fields.alias"
                                   fullWidth={true}
                                   validate={validateAlias}
                                   helperText={false}/>
                        <AutocompleteInput source="parameterType" name="parameterType"
                                           label="resources.EmailTemplateParameter.fields.parameterType"
                                           helperText={false}
                                           validate={required()}
                                           choices={PARAMETER_CHOICES}/>
                        <BooleanInput source="required" name="required" options={{}}
                                      label="resources.EmailTemplateParameter.fields.required"
                                      helperText={false}/>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <SaveButton label="Ok" form="inputParameterForm" alwaysEnable={true} icon={<DoneIcon/>}/>
                    <Button onClick={handleClose} label="ra.action.cancel" startIcon={<CancelIcon/>}/>
                </DialogActions>
            </Dialog>
        </>
    );
};
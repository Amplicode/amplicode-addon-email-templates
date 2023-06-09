import {
    BooleanField,
    Datagrid,
    ListContextProvider,
    SelectField,
    TextField,
    TopToolbar,
    useInput,
    useList,
    useRecordContext,
    useTranslate
} from "react-admin";
import {useCallback, useState} from "react";
import {InputParameterEditDialog} from "../parameter/InputParameterEditDialog";
import {EmailTemplateParameter} from "@amplicode/gql/graphql";
import {DeleteParameterButton} from "../parameter/DeleteParameterButton";
import {PARAMETER_CHOICES} from "../parameter/constants";
import Inbox from "@mui/icons-material/Inbox";
import Typography from "@mui/material/Typography";
import {EditParameterButton} from "../parameter/EditParameterButton";
import {CreateParameterButton} from "../parameter/CreateParameterButton";

enum ActionType {
    EDIT,
    DELETE
}

interface InputParameterManyInputProps {
    source: string;
}

/*
 * Input component for email template parameters.
 * Represents a data grid with actions.
 */
export const EmailTemplateParameterManyInput = ({source}: InputParameterManyInputProps) => {
    const {field} = useInput({source});
    const listContext = useList({data: field.value});
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [lastSelectedParameter, setLastSelectedParameter] = useState<EmailTemplateParameter | null>(null);

    const editInputParameter = useCallback((parameter: EmailTemplateParameter) => {
        setEditDialogOpen(false);
        if (lastSelectedParameter && parameter.orderNumber === lastSelectedParameter.orderNumber) {
            const parameters: EmailTemplateParameter[] = field.value as EmailTemplateParameter[];
            const newParameters = parameters.map(param => {
                return param.orderNumber === parameter.orderNumber ? parameter : param;
            });
            field.onChange(newParameters);
        } else {
            field.onChange([...field.value, parameter]);
        }
        setLastSelectedParameter(null);
    }, [lastSelectedParameter, field]);

    const removeInputParameter = useCallback((inputParameter: EmailTemplateParameter) => {
        const newParams = (field.value as EmailTemplateParameter[])
            .filter(param => param.orderNumber !== inputParameter.orderNumber)
            .map((param, index) => {
                param.orderNumber = index;
                return param;
            });
        field.onChange(newParams);

        if (inputParameter.orderNumber === lastSelectedParameter?.orderNumber) {
            setLastSelectedParameter(null);
        }
    }, [field, lastSelectedParameter]);

    const onCreateButtonClick = useCallback(() => {
        setLastSelectedParameter(null);
        setEditDialogOpen(true);
    }, []);

    return (
        <ListContextProvider value={listContext}>
            {listContext.data && listContext.data.length > 0 &&
                <TopToolbar style={{minHeight: "auto", paddingTop: 0, paddingBottom: 0}}>
                    <CreateParameterButton onClick={onCreateButtonClick}/>
                </TopToolbar>}
            <InputParameterEditDialog open={editDialogOpen}
                                      handleSubmit={editInputParameter}
                                      handleClose={() => setEditDialogOpen(false)}
                                      inputParameter={lastSelectedParameter}
                                      parameters={field.value}/>
            <Datagrid
                empty={<EmptyParameters onCreateButtonClick={onCreateButtonClick}/>}
                bulkActionButtons={false}>
                <TextField source="name" label="resources.EmailTemplateParameter.fields.name"/>
                <TextField source="alias" label="resources.EmailTemplateParameter.fields.alias"/>
                <SelectField source="parameterType" label="resources.EmailTemplateParameter.fields.parameterType"
                             choices={PARAMETER_CHOICES}/>
                <BooleanField source="required" label="resources.EmailTemplateParameter.fields.required"/>
                <ParameterActionButton actionType={ActionType.EDIT}
                                       handleClick={inputParameter => {
                                           setLastSelectedParameter(inputParameter);
                                           setEditDialogOpen(true);
                                       }}/>
                <ParameterActionButton actionType={ActionType.DELETE}
                                       handleClick={removeInputParameter}/>
            </Datagrid>
        </ListContextProvider>
    );
};

interface EmptyParametersProps {
    onCreateButtonClick: () => void
}

const EmptyParameters = ({onCreateButtonClick}: EmptyParametersProps) => {
    const translate = useTranslate();

    return <div style={{textAlign: "center"}}>
        <Inbox color="disabled" scale={5}/>
        <Typography variant="body1" paragraph textAlign="center" color="text.secondary">
            {translate("resources.EmailTemplateParameter.empty")}
        </Typography>
        <Typography variant="body2" paragraph textAlign="center" color="text.secondary">
            {translate("resources.EmailTemplateParameter.invite")}
        </Typography>
        <CreateParameterButton onClick={onCreateButtonClick} variant="contained"/>
    </div>;
};

interface ParameterActionButtonProps {
    handleClick: (inputParameter: EmailTemplateParameter) => void;
    actionType: ActionType;
}

const ParameterActionButton = ({handleClick, actionType}: ParameterActionButtonProps) => {
    const inputParameter: EmailTemplateParameter = useRecordContext();
    const onClick = useCallback(() => handleClick(inputParameter), [handleClick, inputParameter]);
    return (
        <>
            {actionType === ActionType.EDIT ? <EditParameterButton onClick={onClick}/> :
                <DeleteParameterButton onClick={onClick}/>}
        </>
    );
};
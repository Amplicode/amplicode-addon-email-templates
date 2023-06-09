import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CodeMirror from "@uiw/react-codemirror";
import {html as codeMirrorHtml} from "@codemirror/lang-html";
import {css as codeMirrorCss} from "@codemirror/lang-css";
import DialogActions from "@mui/material/DialogActions";
import {Button, useTranslate} from "react-admin";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";


interface ExportHTMLDialogProps {
    handleExport: () => void
    handleClose: () => void
    value: string
}

/*
 * Dialog to export an HTML content from GrapesJS editor
 */
export const ExportHTMLDialog = ({handleClose, handleExport, open, value}: ExportHTMLDialogProps & DialogProps) => {
    const translate = useTranslate();

    return (
        <>
            <Dialog maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle>
                    {translate("HtmlContentInput.exportDialog.title")}
                </DialogTitle>
                <DialogContent>
                    <CodeMirror readOnly={true} minWidth="100vh" minHeight="60vh"
                                style={{border: "1px solid silver"}}
                                value={value}
                                extensions={[codeMirrorHtml(), codeMirrorCss()]}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExport} label="HtmlContentInput.exportDialog.okButton"
                            startIcon={<FileUploadIcon/>}/>
                    <Button onClick={handleClose} label="ra.action.cancel"
                            startIcon={<CancelIcon/>}/>
                </DialogActions>
            </Dialog>
        </>
    )
};
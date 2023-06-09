import Dialog, {DialogProps} from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CodeMirror from "@uiw/react-codemirror";
import {html as codeMirrorHtml} from "@codemirror/lang-html";
import {css as codeMirrorCss} from "@codemirror/lang-css";
import DialogActions from "@mui/material/DialogActions";
import {Button, useTranslate} from "react-admin";
import GetAppIcon from "@mui/icons-material/GetApp";
import CancelIcon from "@mui/icons-material/Cancel";

import {useState} from "react";

interface ImportExportDialogProps {
    handleClose: () => void
    handleImport: (importedHtml: string) => void
}

/*
 * Dialog to import HTML to GrapesJS editor
 */
export const ImportHTMLDialog = ({handleClose, handleImport, open}: ImportExportDialogProps & DialogProps) => {
    const translate = useTranslate();
    const [importedHtml, setImportedHtml] = useState<string>("");

    return (
        <>
            <Dialog maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle>
                    {translate("HtmlContentInput.importDialog.title")}
                </DialogTitle>
                <DialogContent>
                    <CodeMirror minWidth="100vh" minHeight="60vh"
                                style={{border: "1px solid silver"}}
                                extensions={[codeMirrorHtml(), codeMirrorCss()]}
                                onChange={value => setImportedHtml(value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleImport(importedHtml)}
                            label="HtmlContentInput.importDialog.okButton" startIcon={<GetAppIcon/>}/>
                    <Button onClick={handleClose} label="ra.action.cancel"
                            startIcon={<CancelIcon/>}/>
                </DialogActions>
            </Dialog>
        </>
    );
};
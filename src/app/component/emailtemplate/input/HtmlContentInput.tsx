import "grapesjs/dist/css/grapes.min.css";
import "../../../grapesjs/grapesjs-editor.css";

import {required as requiredValidator, useInput} from "react-admin";

import {useCallback, useEffect, useState} from "react";
import {Editor as GrapesJsEditor} from "grapesjs";
import juice from "juice";
import {html_beautify} from "js-beautify";
import {ImportHTMLDialog} from "./ImportHTMLDialog";
import {ExportHTMLDialog} from "./ExportHTMLDialog";
import {ClearCanvasDialog} from "./ClearCanvasDialog";
import Typography from "@mui/material/Typography";
import {createGrapesJsEditor} from "../../../grapesjs/createGrapesJsEditor";


interface HtmlContentInputProps {
    source: string
    onInit: (grapesJsEditor: GrapesJsEditor) => void
    required?: boolean
}
/*
   Input component to edit HTML content using GrapesJS editor.
 */
export const HtmlContentInput = ({source, onInit, required}: HtmlContentInputProps) => {
    const {
        field, formState: {isSubmitted, dirtyFields},
        fieldState: {isTouched, invalid, error}
    } = useInput({source: source, validate: required ? requiredValidator() : undefined});
    const [editor, setEditor] = useState<GrapesJsEditor | null>(null);
    const [initialEditorContent, setInitialEditorContent] = useState<string | null>();
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [clearCanvasDialogOpen, setClearCanvasDialogOpen] = useState(false);

    const changeValue = useCallback((editor: GrapesJsEditor) => {
        const html = editor.getHtml();
        const bodyContent = html + `<style>${editor.getCss()}</style>`;
        field.onChange(html !== "<body></body>" ? bodyContent : null); //to exclude empty HTML
    }, [field]);

    useEffect(() => {
        //to recreate GrapesJS editor after record is fetched first time
        if (!editor || (initialEditorContent !== field.value && !dirtyFields["bodyContent"])) {
            const components = field.value;

            const grapesJsEditor: GrapesJsEditor = createGrapesJsEditor(components,
                () => setImportDialogOpen(true), //show dialog to import HTML
                () => setExportDialogOpen(true), //show dialog to export HTML
                () => setClearCanvasDialogOpen(true), //show dialog to clear canvas
            );

            setInitialEditorContent(components);

            grapesJsEditor.on("update", (_params: any) => { //update field value when GrapesJS editor content is updated
                changeValue(grapesJsEditor);
            });

            setEditor(grapesJsEditor);
            onInit(grapesJsEditor);
        }
    }, [field, dirtyFields, editor, initialEditorContent, onInit, changeValue]);

    useEffect(() => {
        if (isTouched || isSubmitted) {
            const grapesJsFrame = document.getElementsByClassName("gjs-frame");
            if (grapesJsFrame && grapesJsFrame.length === 1 && grapesJsFrame[0] instanceof HTMLIFrameElement) {
                const grapesJsFrameBody = (grapesJsFrame[0] as HTMLIFrameElement).contentDocument?.body;
                if (grapesJsFrameBody) {
                    grapesJsFrameBody.style.border = invalid ? "1px solid red" : "none";
                }
            }
        }
    }, [isTouched, isSubmitted, invalid]);

    const handleClearCanvas = useCallback(() => {
        editor?.runCommand("core:canvas-clear"); //run standard GrapesJS editor command to clear canvas
        setClearCanvasDialogOpen(false);
    }, [editor]);

    const handleExport = useCallback(() => {
        editor?.runCommand("gjs-export-zip"); //export to ZIP using default command
        setExportDialogOpen(false);
    }, [editor]);

    const handleImport = useCallback((importedHtml: any) => {
        editor?.setComponents(importedHtml);
        setImportDialogOpen(false);
    }, [editor]);

    const handleExportDialogClose = useCallback(() => setExportDialogOpen(false), []);
    const handleClearCanvasDialogClose = useCallback(() => setClearCanvasDialogOpen(false), []);
    const handleImportDialogClose = useCallback(() => setImportDialogOpen(false), []);

    return (
        <>
            {((isTouched || isSubmitted) && invalid) && <Typography variant="body2" color="error">{error?.message}</Typography>}
            <div id="gjs">
            </div>
            <ImportHTMLDialog handleClose={handleImportDialogClose} handleImport={handleImport} open={importDialogOpen}/>
            <ExportHTMLDialog open={exportDialogOpen} handleClose={handleExportDialogClose}
                              value={editor ? html_beautify(juice(editor.getHtml() + `<style>${editor.getCss()}</style>`)) : ""} //get formatted HTML with inline CSS styles from GrapesJS editor
                              handleExport={handleExport}/>
            <ClearCanvasDialog handleClearCanvas={handleClearCanvas} handleClose={handleClearCanvasDialogClose} open={clearCanvasDialogOpen}/>
        </>
    );
};
import grapesjs, {Editor as GrapesJsEditor} from "grapesjs";
import newsLetterPlugin from "grapesjs-preset-newsletter";
import exportPlugin from "grapesjs-plugin-export";
import ckeditor4Plugin from "./ckeditor4Plugin";

/*
 Creates an instance of GrapesJS editor.
 */
export const createGrapesJsEditor = (components: string,
                                     handleImportHtml: () => void,
                                     handleExportHtml: () => void,
                                     handleClearCanvas: () => void) => {
    const grapesJsEditor: GrapesJsEditor = grapesjs.init({
        container: "#gjs", //generate GrapesJS editor in <div> with id = 'gjs'
        plugins: [newsLetterPlugin, exportPlugin, ckeditor4Plugin],
        storageManager: false,
        height: "650px",

    });

    grapesJsEditor.setComponents(components);
    const commands = grapesJsEditor.Commands;
    commands.add("import-html", {
        run: () => {
           handleImportHtml();
        }
    });

    commands.add("export-html", {
        run: () => {
            handleExportHtml();
        }
    });

    commands.add("clear-canvas", {
        run: () => {
            handleClearCanvas();
        }
    });

    const panels = grapesJsEditor.Panels;
    panels.getButton("options", "sw-visibility")?.set("active", true); //make component borders visible in editor
    panels.getButton("options", "gjs-open-import-template").set("command", "import-html"); //replace default command to import HTML with custom
    panels.getButton("options", "export-template").set("command", "export-html"); //replace default command to export HTML with custom
    panels.getButton("options", "canvas-clear").set("command", "clear-canvas"); //replace default command with custom

    return grapesJsEditor;
}
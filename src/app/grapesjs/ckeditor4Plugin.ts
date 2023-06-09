import grapesjs, {Editor as GrapesJsEditor} from "grapesjs";
import config = CKEDITOR.config;
import editor = CKEDITOR.editor;

const stopPropagation = (e: any) => e.stopPropagation();

interface CKEditor4PluginOptions {
    options: config,
    position: ToolbarPosition
}

interface CKEditor {
    ckEditor: editor,
    /**
     * Implement the `rte.getContent` method so that GrapesJS is able to retrieve CKE's generated content (`rte.getData`) properly
     *
     * See:
     *  - {@link https://github.com/artf/grapesjs/issues/2916}
     *  - {@link https://github.com/artf/grapesjs/blob/dev/src/dom_components/view/ComponentTextView.js#L80}
     *  - {@link https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData}
     */
    getContent: () => string
}

enum ToolbarPosition {
    LEFT,
    CENTER,
    RIGHT
}

let pluginOptions: CKEditor4PluginOptions = {
    // CKEditor options
    options: {
        extraPlugins: "sharedspace, justify, colorbutton, font",
        language: "en",
        //@ts-ignore
        enterMode: CKEDITOR.ENTER_BR, //to avoid wrap a text in <p>
        toolbarGroups: [
            { name: "document", groups: [ "document", "mode", "doctools" ] },
            { name: "clipboard", groups: [ "clipboard", "undo" ] },
            { name: "editing", groups: [ "find", "selection", "spellchecker", "editing" ] },
            { name: "forms", groups: [ "forms" ] },
            { name: "basicstyles", groups: [ "basicstyles", "cleanup" ] },
            { name: "paragraph", groups: [ "list", "indent", "blocks", "align", "bidi", "paragraph" ] },
            "/",
            { name: "styles", groups: [ "styles" ] },
            { name: "colors", groups: [ "colors" ] },
            { name: "tools", groups: [ "tools" ] },
            { name: "others", groups: [ "others" ] },
            { name: "about", groups: [ "about" ] }
        ],
        removeButtons: "Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord," +
            "Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton," +
            "HiddenField,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Anchor," +
            "Flash,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,ShowBlocks,Maximize,About"
    },

    // On which side of the element to position the toolbar
    position: ToolbarPosition.LEFT,
};

const createCKEditor = (selectedElement: HTMLElement, rteToolbar: HTMLElement, grapesJsEditor: GrapesJsEditor) => {
    // Init inline CKEditor

    //@ts-ignore
    const ckEditor: editor = CKEDITOR.inline(selectedElement, pluginOptions.options);

    // Make click event propagate
    ckEditor.on("contentDom", () => {
        let editable = ckEditor.editable();
        editable.attachListener(editable, "click", () => {
            selectedElement.click();
        });
    });

    // The toolbar is not immediately loaded so will be wrong positioned.
    // With this trick we trigger an event which updates the toolbar position
    ckEditor.on("instanceReady", (() => {
        let toolbar = rteToolbar.querySelector("#cke_" + ckEditor.name);
        if (toolbar) {
            (toolbar as HTMLElement).style.display = "block";
        }
        grapesJsEditor.trigger("canvasScroll")
    }));


    // Prevent blur when some of CKEditor's element is clicked
    ckEditor.on("dialogShow", () => {
        const editorEls = grapesjs.$(".cke_dialog_background_cover, .cke_dialog");
        ["off", "on"].forEach(m => editorEls[m]("mousedown", stopPropagation));
    });
    return ckEditor;
}

const enableRTE = (selectedElement: HTMLElement, rte: CKEditor, grapesJsEditor: GrapesJsEditor) => {
    // If riche text editor (RTE) already exists just focus on it
    if (rte && rte.ckEditor && rte.ckEditor.status !== "destroyed") {
        focus(selectedElement, rte.ckEditor);
        return rte;
    }

    selectedElement.contentEditable = "true"; //make selected HTML block editable

    let rteToolbar: HTMLElement = grapesJsEditor.RichTextEditor.getToolbarEl(); //get default RTE toolbar from GrapesJS editor
    Array.from(rteToolbar.children).forEach((child) => { //hide all default actions in default toolbar to replace with CKEditor toolbar
        (child as HTMLElement).style.display = "none";
    });

    // Check for the mandatory options
    pluginOptions.options.sharedSpaces = {top: rteToolbar}; //include 'sharedspace' option to place CKEditor toolbar inside GrapesJS toolbar

    const ckEditor = createCKEditor(selectedElement, rteToolbar, grapesJsEditor);

    rte = {
        ckEditor: ckEditor,
        getContent: () => ckEditor.getData()
    }

    focus(selectedElement, ckEditor);

    return rte;
}

const focus = (el: HTMLElement, rte: editor) => {
    // Do nothing if already focused
    if (rte && rte.focusManager.hasFocus) {
        return;
    }
    el.contentEditable = "true";
    rte && rte.focus();
}

const updatePosition = (c: CKEditor4PluginOptions, pos: any) => {
    switch (c.position) {
        case ToolbarPosition.CENTER:
            let diff = (pos.elementWidth / 2) - (pos.targetWidth / 2);
            pos.left = pos.elementLeft + diff;
            break;
        case ToolbarPosition.RIGHT:
            let width = pos.targetWidth;
            pos.left = pos.elementLeft + pos.elementWidth - width;
            break;
    }

    if (pos.top <= pos.canvasTop) {
        pos.top = pos.elementTop + pos.elementHeight;
    }

    // Check if not outside the canvas
    if (pos.left < pos.canvasLeft) {
        pos.left = pos.canvasLeft;
    }
}

const ckeditor4Plugin = (grapesJsEditor: GrapesJsEditor) => {
    //set CKEditor as custom Rich Text Editor (RTE) for GrapesJS editor

    //allow to editable span, a, strong, b, li, i
    //@ts-ignore
    CKEDITOR.dtd.$editable.span = 1
    //@ts-ignore
    CKEDITOR.dtd.$editable.a = 1
    //@ts-ignore
    CKEDITOR.dtd.$editable.strong = 1
    //@ts-ignore
    CKEDITOR.dtd.$editable.b = 1
    //@ts-ignore
    CKEDITOR.dtd.$editable.i = 1
    //@ts-ignore
    CKEDITOR.dtd.$editable.li = 1

    grapesJsEditor.setCustomRte({
        enable: (selectedElement: HTMLElement, rte: CKEditor) => enableRTE(selectedElement, rte, grapesJsEditor),
        disable: (selectedElement: HTMLElement, rte: CKEditor) => {
            selectedElement.contentEditable = "false";
            if (rte?.ckEditor?.focusManager)
                rte.ckEditor.focusManager.blur(true);
        }
    });

    // Update RTE toolbar position
    grapesJsEditor.on("rteToolbarPosUpdate", (pos: any) => {
        // Update by position
        updatePosition(pluginOptions, pos);
    });
}

export default ckeditor4Plugin;


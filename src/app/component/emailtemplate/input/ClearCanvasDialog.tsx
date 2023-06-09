import Dialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button, useTranslate} from "react-admin";
import CancelIcon from "@mui/icons-material/Cancel";

import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";

interface ClearCanvasDialogProps {
    handleClearCanvas: () => void
    handleClose: () => void
}

/*
 * Dialog to clear GrapesJS editor canvas
 */
export const ClearCanvasDialog = ({handleClose, handleClearCanvas, open}: ClearCanvasDialogProps & DialogProps) => {
    const translate = useTranslate();

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {translate("HtmlContentInput.clearCanvasDialog.title")}
                </DialogTitle>
                <DialogContent>
                   <Typography variant="body2" color="text.secondary">
                       {translate("HtmlContentInput.clearCanvasDialog.content")}
                   </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClearCanvas} label="Ok"
                            startIcon={<DoneIcon/>}/>
                    <Button onClick={handleClose} label="ra.action.cancel"
                            startIcon={<CancelIcon/>}/>
                </DialogActions>
            </Dialog>
        </>
    )
};
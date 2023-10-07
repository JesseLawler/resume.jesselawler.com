import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} style={{ padding: 20 }}>
      <DialogTitle>
        QR code
        <a onClick={handleClose} className="close-box">
          <CloseIcon />
        </a>
      </DialogTitle>
      <DialogContent>
        <img src="/images/qr-code.png" alt="QR code" />
        <div id="qr-code-disclaimer">
          links back to this page; nothing fancy.
        </div>
      </DialogContent>
    </Dialog>
  );
}

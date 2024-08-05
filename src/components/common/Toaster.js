import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = () => {
  const toastStateFromRedux = useSelector((state) => state.toast);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(toastStateFromRedux.open);
  }, [toastStateFromRedux]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastStateFromRedux.severity}
          sx={{ width: "100%" }}
        >
          {toastStateFromRedux.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toaster;

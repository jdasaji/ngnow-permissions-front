import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import PermissionForm from "./PermissionsForm";

const PermissionsList = ({
  permissions,
  onEdit,
  onGetItemSelected,
  loading,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = (permissions) => {
    setSelectedPermissions(permissions);
    setOpen(true);
  };
  const handleClickNew = () => {
    setSelectedPermissions(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPermissions(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClickNew()}
            >
              Nuevo
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Tipo de Permiso</TableCell>
                  <TableCell>Fecha de Permiso</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permissions
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.nameEmployee}</TableCell>
                      <TableCell>{item.lastEmployee}</TableCell>
                      <TableCell>{item.permissionsTypeName}</TableCell>
                      <TableCell>{item.datePermissions}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={async () => {
                            const getDATA = await onGetItemSelected(item.id);

                            handleClickOpen(getDATA);
                          }}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={permissions ? permissions.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedPermissions ? "Editar Empleado" : "Nuevo Empleado"}
        </DialogTitle>
        <DialogContent>
          <PermissionForm
            permissions={selectedPermissions}
            onSave={async (param) => {
              const dataAddUpdate = await onEdit(param);
              if (dataAddUpdate?.isValid) {
                setSnackbarMessage(dataAddUpdate?.messages);
                setSnackbarSeverity("success");
                handleClose();
              } else {
                setSnackbarMessage(dataAddUpdate?.messages);
                setSnackbarSeverity("error");
              }

              setSnackbarOpen(true);
              //handleClose();
            }}
            loading={loading}
            error={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PermissionsList;

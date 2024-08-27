import React, { useState } from "react";
import {
  InputLabel,
  Button,
  TextField,
  Typography,
  Container,
  Select,
  MenuItem,
} from "@mui/material";

const PermissionForm = ({ permissions, onSave, loading, error }) => {
  const [id, setId] = useState(permissions?.id || "");

  const [nameEmployee, setNameEmployee] = useState(
    permissions?.nameEmployee || ""
  );
  const [lastEmployee, setLastEmployee] = useState(
    permissions?.lastEmployee || ""
  );
  const [permissionsType, setPermissionsType] = useState(
    permissions?.permissionsType || 0
  );
  const [datePermissions, setDatePermissions] = useState(
    permissions?.datePermissions || ""
  );

  const [formErrors, setFormErrors] = useState({});

  const validate = (param_permissionsType = null) => {
    const errors = {};
    if (!nameEmployee.trim()) errors.nameEmployee = "El nombre es obligatorio.";
    if (!lastEmployee.trim())
      errors.lastEmployee = "El apellido es obligatorio.";
    if (
      (param_permissionsType && param_permissionsType == 0) ||
      permissionsType === "" ||
      isNaN(permissionsType) ||
      permissionsType == 0
    ) {
      errors.permissionsType = "El tipo de permiso debe ser un número.";
    }
    if (!datePermissions.trim())
      errors.datePermissions = "La fecha es obligatoria.";
    else if (isNaN(Date.parse(datePermissions)))
      errors.datePermissions = "La fecha debe estar en formato válido.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      onSave({
        Id: permissions?.id,
        NameEmployee: nameEmployee,
        LastEmployee: lastEmployee,
        PermissionsType: permissionsType,
        DatePermissions: datePermissions,
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {permissions
          ? "Actualizar Información del Empleado"
          : "Registrar Nuevo Empleado"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nameEmployee}
          onChange={(e) => setNameEmployee(e.target.value)}
          error={!!formErrors.nameEmployee}
          helperText={!!formErrors.nameEmployee}
        />
        <InputLabel htmlFor="nameEmployee" error={!!formErrors.nameEmployee}>
          {formErrors.nameEmployee}
        </InputLabel>
        <TextField
          label="Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastEmployee}
          onChange={(e) =>
            setFormErrors(validate()) & setLastEmployee(e.target.value)
          }
          error={!!formErrors.lastEmployee}
          helperText={!!formErrors.lastEmployee}
        />

        <InputLabel htmlFor="lastEmployee" error={!!formErrors.lastEmployee}>
          {formErrors.lastEmployee}
        </InputLabel>

        <InputLabel id="permissionsType-label">Tipo de Permiso</InputLabel>
        <Select
          labelId="permissionsType-label"
          value={permissionsType}
          onChange={(e) => {
            const newFormError = {
              ...formErrors,
              permissionsType:
                e.target.value > 0
                  ? ""
                  : "El tipo de permiso debe ser un número.",
            };
            setFormErrors(newFormError);
            setPermissionsType(e.target.value);
          }}
          displayEmpty
          fullWidth
          error={!!formErrors.permissionsType} // Apply error styling directly here
        >
          <MenuItem value={0}>
            <em>Selecciona un tipo de permiso</em>
          </MenuItem>
          <MenuItem value={1}>Administrador</MenuItem>
          <MenuItem value={2}>Invitado</MenuItem>
        </Select>

        <InputLabel
          htmlFor="permissionsType"
          error={!!formErrors.permissionsType}
        >
          {formErrors.permissionsType}
        </InputLabel>

        <TextField
          label="Fecha de Permiso"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={datePermissions}
          onChange={(e) =>
            setFormErrors(validate()) & setDatePermissions(e.target.value)
          }
          error={!!formErrors.datePermissions}
          helperText={!!formErrors.datePermissions}
        />
        <InputLabel
          htmlFor="datePermissions"
          error={!!formErrors.datePermissions}
        >
          {formErrors.datePermissions}
        </InputLabel>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {permissions ? "Actualizar" : "Guardar"}
        </Button>
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </form>
    </Container>
  );
};

export default PermissionForm;

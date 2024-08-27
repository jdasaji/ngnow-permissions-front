import React from "react";
import PermissionsList from "../Components/PermissionsList";
import { usePermissionsModel } from "../Models/PermissionsModel";

const PermissionsContainer = ({ permissionsId }) => {
  const { permissions, loading, error, postAddData, getById } =
    usePermissionsModel(permissionsId);

  /*useEffect(() => {
    // Llama a loadEmployee para cargar todos los empleados al montar el componente
    const fetchEmployees = async () => {
      try {
        await loadPermissions(); // Si loadEmployee no requiere parámetros, llámalo así
      } catch (err) {
        console.error("Error al cargar empleados:", err);
      }
    };
    fetchEmployees();
  }, []); // Solo vuelve a ejecutar si loadEmployee cambia
*/
  const handleEdit = async (employeeData) => {
    const dataAddUpdate = await postAddData(employeeData);
    return dataAddUpdate;
    // Optionally refresh the employee list or show success message
  };
  const onGetItemSelected = async (id) => {
    const dataAddUpdate = await getById(id);
    return dataAddUpdate;
    // Optionally refresh the employee list or show success message
  };
  return (
    <PermissionsList
      permissions={permissions}
      onEdit={handleEdit}
      loading={loading}
      error={error}
      onGetItemSelected={onGetItemSelected}
    />
  );
};

export default PermissionsContainer;

import { useState, useEffect } from "react";
import { getPermissions, postAdd, postUpdate } from "../Services/apiService";

export function usePermissionsModel(permissionsId) {
  const [permissions, setPermissions] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      try {
        const data = await getPermissions(null);
        setPermissions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [permissionsId]);

  const loadPermissions = async () => {
    setLoading(true);
    try {
      const data = await getPermissions(null);
      setPermissions(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    setLoading(true);
    try {
      const data = await getPermissions({ id });
      return data ? data[0] : null;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const postAddData = async (PermissionsData) => {
    setLoading(true);
    try {
      const data = PermissionsData.Id
        ? await postUpdate(PermissionsData)
        : await postAdd(PermissionsData);
      await loadPermissions();
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    permissions,
    loading,
    error,
    loadPermissions,
    postAddData,
    getById,
  };
}

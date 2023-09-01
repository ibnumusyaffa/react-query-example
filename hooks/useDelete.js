import { useState } from "react";
import { useToast } from "@chakra-ui/react";

function useDelete({ afterDeleted, onDelete, onCancel }) {
  let [showAlertDelete, setShowAlertDelete] = useState(false);

  let [id, setId] = useState(null);

  
  let [deleteLoading, setDeleteLoading] = useState(false);
  let [deleteLoading2, setDeleteLoading2] = useState(false);

  const toast = useToast();
  async function onConfirmDelete() {
    try {
      setDeleteLoading(true);
      let result = await onDelete(id);
      toast({
        position: "top-right",
        title: "Berhasil",
        description: result.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      afterDeleted();
      setDeleteLoading(false);
      setShowAlertDelete(false);
    } catch (error) {
      setDeleteLoading(false);
      setShowAlertDelete(false);

      if (error.response?.data?.message) {
        toast({
          position: "top-right",
          title: "Error",
          description: error.response?.data?.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "Error",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }


  function confirmDelete(newID) {
    setId(newID);
    setShowAlertDelete(true);
  }


  return {
    showAlertDelete,
    setShowAlertDelete,
    deleteLoading,
    deleteLoading2,
    confirmDelete,
    onConfirmDelete
  };
}

export default useDelete;

import { useState } from "react";

export const useDeleteReading = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return { isDeleting, setIsDeleting, isDialogOpen, openDialog, closeDialog };
};

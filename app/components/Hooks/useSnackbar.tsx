import { useSnackbar as useNotistackSnackbar } from "notistack";

function useSnackbar() {
  const { enqueueSnackbar } = useNotistackSnackbar();

  const showSnackbar = (message: string, variant: "success" | "error" | "warning" | "info") => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
  };

  return { showSnackbar };
}

export default useSnackbar;

import { SweetAlertIcon, SweetAlertCustomClass } from "sweetalert2";
import SweetAlert from "./swal";
import "./index.css"
const swalFire = ({
  title = "",
  text = "",
  html = "",
  icon = "warning" as SweetAlertIcon,
  showCancelButton = true,
  customClass = null as SweetAlertCustomClass | null,
  confirmButtonText = "OK",
}) => {
  return SweetAlert.fire({
    title,
    text,
    html,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText: "Cancel",
    customClass: customClass || {
        confirmButton: 'confirm-button-class',
        cancelButton: 'cancel-button-class',
        title: 'title-class',
        htmlContainer: 'input-class',
        icon: 'icon-class',
        actions: 'action-class',
    },
    buttonsStyling: false,
  });
};

export default swalFire
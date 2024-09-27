import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const alert = withReactContent(Swal);

export const showAlert = (icon, title) => {
    return alert.fire({ icon, title });
};
import Swal from 'sweetalert2'
export default (text) => {
  Swal.fire({title: text, showConfirmButton: false, timer: 1000})
}
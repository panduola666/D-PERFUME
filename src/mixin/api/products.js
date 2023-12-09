import Swal from "../Swal"
export default async () => {
  try {
    const res = await fetch('https://ec-course-api.hexschool.io/v2/api/hex-project/products/all')
    return res.json()
  } catch (error) {
    Swal('Oops..網路出錯')
  }

}
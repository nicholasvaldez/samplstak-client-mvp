export const getSamples = () => {
  return fetch("http://localhost:8000/samples", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

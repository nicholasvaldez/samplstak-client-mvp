export const getGenres = () => {
  return fetch("http://localhost:8000/genres", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

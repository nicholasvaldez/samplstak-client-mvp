export const addToCollection = (sample) => {
  return fetch(`http://localhost:8000/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(sample),
  })
}

export const getCollectionSamples = () => {
  return fetch("http://localhost:8000/collections", {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

export const getGenreCollectionSamples = (id) => {
  return fetch(`http://localhost:8000/collections?genre=${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

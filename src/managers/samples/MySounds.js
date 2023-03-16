export const getMySoundsSamples = () => {
  return fetch(`http://localhost:8000/samples?producer`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((response) => response.json())
}

export const addNewSample = (Sample) => {
  return fetch("http://localhost:8000/samples", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
    body: JSON.stringify(Sample),
  })
}

export const deleteSample = (id) => {
  return fetch(`http://localhost:8000/samples/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  })
}

export const updateSample = (id, sample) => {
  return fetch(`http://localhost:8000/samples/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(sample),
  })
}

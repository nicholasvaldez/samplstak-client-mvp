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

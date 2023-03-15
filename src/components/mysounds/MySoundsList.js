import React, { useEffect, useState } from "react"

import { getSamples } from "../../managers/samples/SampleManager"
import { MySoundsSamples } from "./MySoundsSamples"
import "./mysounds.css"

export const MySoundsList = (props) => {
  const [samples, setSamples] = useState([])

  useEffect(() => {
    getSamples().then((data) => setSamples(data))
  }, [])

  return (
    <>
      <h1>Create.</h1>
      <article className="samples">
        {samples.map((s) => (
          <MySoundsSamples
            id={s.id}
            fileUrl={s.file_url}
            fileName={s.file_name}
            producer={s.producer}
            instrument={s.instrument.label}
            genre={s.genre.map((g) => g.label).join(", ")}
          />
        ))}
      </article>
    </>
  )
}

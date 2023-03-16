import React, { useEffect, useState } from "react"
import { MySoundsSamples } from "./MySoundsSamples"
import "./mysounds.css"
import {
  addNewSample,
  getMySoundsSamples,
} from "../../managers/samples/MySounds"
import { Link } from "react-router-dom"

export const MySoundsList = (props) => {
  const [samples, setSamples] = useState([])

  useEffect(() => {
    getMySoundsSamples().then((data) => setSamples(data))
  }, [])

  return (
    <>
      <div className="headers">
        <h1>Create.</h1>
        <a href={"/mysounds/new"}>
          <h1 className="plus">+</h1>
        </a>
      </div>
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

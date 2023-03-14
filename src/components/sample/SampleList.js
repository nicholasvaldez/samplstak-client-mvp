import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getSamples } from "../../managers/SampleManager"
import { Samples } from "./Samples"
import "./samples.css"

export const SampleList = (props) => {
  const [samples, setSamples] = useState([])
  const [instruments, setInstruments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getSamples().then((data) => setSamples(data))
  }, [])

  return (
    <>
      i
      <article className="samples">
        {samples.map((s) => (
          <Samples
            key={s.id}
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

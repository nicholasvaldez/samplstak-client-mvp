import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getInstruments } from "../../managers/instruments/Instruments"
import { getSamples } from "../../managers/samples/SampleManager"
import { Samples } from "./Samples"
import "./samples.css"

export const SampleList = (props) => {
  const [samples, setSamples] = useState([])
  const [filteredSamples, setFilteredSamples] = useState([])
  const [instruments, setInstruments] = useState([])
  const [instId, setInstId] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getSamples().then((data) => setSamples(data))
  }, [])

  useEffect(() => {
    getSamples().then((data) => setFilteredSamples(data))
  }, [])

  useEffect(() => {
    getInstruments().then((data) => setInstruments(data))
  }, [])

  useEffect(() => {
    const filteredCopy = samples.filter((s) => s.instrument.id === instId)
    setFilteredSamples(filteredCopy)
  }, [instId])

  return (
    <>
      <fieldset>
        <div className="form-group">
          <select
            onChange={(evt) => {
              setInstId(parseInt(evt.target.value))
            }}
          >
            <option value={0}>{`Instrument`}</option>
            {instruments.map((i) => (
              <option key={`instrument--${i.id}`} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <article className="samples">
        {filteredSamples.map((s) => (
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

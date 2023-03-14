import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getGenres } from "../../managers/genres/Genres"
import { getInstruments } from "../../managers/instruments/Instruments"
import {
  getGenreSamples,
  getSamples,
} from "../../managers/samples/SampleManager"
import { Samples } from "./Samples"
import "./samples.css"

export const SampleList = (props) => {
  const [samples, setSamples] = useState([])
  const [filteredSamples, setFilteredSamples] = useState([])
  const [instruments, setInstruments] = useState([])
  const [instId, setInstId] = useState("")
  const [genreId, setGenreId] = useState("")
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getSamples().then((data) => setSamples(data))
  }, [])

  useEffect(() => {
    if (genreId !== "") {
      getGenreSamples(genreId).then((data) => setFilteredSamples(data))
    } else {
      getSamples().then((data) => setFilteredSamples(data))
    }
  }, [genreId])

  useEffect(() => {
    if (instId !== "") {
      const filteredCopy = samples.filter((s) => s.instrument.id === instId)
      setFilteredSamples(filteredCopy)
    } else {
      getSamples().then((data) => setFilteredSamples(data))
    }
  }, [instId])

  useEffect(() => {
    getInstruments().then((data) => setInstruments(data))
  }, [])

  useEffect(() => {
    getGenres().then((data) => setGenres(data))
  }, [])

  /* useEffect(() => {
    const filteredCopy = samples.filter((s) => s.instrument.id === instId)
    setFilteredSamples(filteredCopy)
  }, [instId]) */
  /* 
  useEffect(() => {
    const filteredCopyGenres = samples.filter((s) => s.genre.id === genreId)
    setFilteredSamples(filteredCopyGenres)
  }, [genreId]) */

  return (
    <>
      <fieldset>
        <div>
          <select
            onChange={(evt) => {
              const value = evt.target.value
              if (value === "") {
                setInstId("")
                setFilteredSamples(samples)
              } else {
                setInstId(parseInt(value))
              }
            }}
          >
            <option value="">{`Instrument`}</option>
            {instruments.map((i) => (
              <>
                <option key={`instrument--${i.id}`} value={i.id}>
                  {i.label}
                </option>
              </>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <select
            onChange={(evt) => {
              const value = evt.target.value
              if (value.length === 0) {
                setGenreId("")
                setFilteredSamples(samples)
              } else {
                setGenreId(value)
              }
            }}
          >
            <option value="">{`Genre`}</option>
            {genres.map((g) => (
              <option key={`genre--${g.id}`} value={g.id}>
                {g.label}
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

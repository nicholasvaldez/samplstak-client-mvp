import React, { useEffect, useState } from "react"
import {
  getCollectionSamples,
  getGenreCollectionSamples,
  getInstrumentCollectionSamples,
} from "../../managers/samples/Collection"
import { SampleCollection } from "./SampleCollection"
import { getInstruments } from "../../managers/instruments/Instruments"
import { getGenres } from "../../managers/genres/Genres"
import "./collection.css"

export const CollectionList = (props) => {
  const [collectionSamples, setCollectionSamples] = useState([])
  const [filteredCollectionSamples, setFilteredCollectionSamples] = useState([])
  const [instruments, setInstruments] = useState([])
  const [instId, setInstId] = useState("")
  const [genreId, setGenreId] = useState("")
  const [genres, setGenres] = useState([])

  useEffect(() => {
    getCollectionSamples().then((data) => setCollectionSamples(data))
  }, [])

  useEffect(() => {
    if (genreId !== "") {
      getGenreCollectionSamples(genreId).then((data) =>
        setFilteredCollectionSamples(data)
      )
    } else {
      getCollectionSamples().then((data) => setFilteredCollectionSamples(data))
    }
  }, [genreId])

  useEffect(() => {
    if (instId !== "") {
      getInstrumentCollectionSamples(instId).then((data) =>
        setFilteredCollectionSamples(data)
      )
    } else {
      getCollectionSamples().then((data) => setFilteredCollectionSamples(data))
    }
  }, [instId])

  useEffect(() => {
    getInstruments().then((data) => setInstruments(data))
  }, [])

  useEffect(() => {
    getGenres().then((data) => setGenres(data))
  }, [])

  return (
    <>
      <h1>Collect.</h1>
      <div className="drops">
        <fieldset className="drops__field">
          <div>
            <select
              onChange={(evt) => {
                const value = evt.target.value
                if (value === "") {
                  setInstId("")
                  setFilteredCollectionSamples(collectionSamples)
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
        <fieldset className="drops__field">
          <div>
            <select
              onChange={(evt) => {
                const value = evt.target.value
                if (value.length === 0) {
                  setGenreId("")
                  setFilteredCollectionSamples(collectionSamples)
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
      </div>
      <article className="samples">
        {filteredCollectionSamples.map((s) => (
          <SampleCollection
            id={s.sample.id}
            fileUrl={s.sample.file_url}
            fileName={s.sample.file_name}
            producer={s.sample.producer}
            instrument={s.sample.instrument.label}
            genre={s.sample.genre.map((g) => g.label).join(", ")}
          />
        ))}
      </article>
    </>
  )
}

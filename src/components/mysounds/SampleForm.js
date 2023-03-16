import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getGenres } from "../../managers/genres/Genres"
import { getInstruments } from "../../managers/instruments/Instruments"
import { addNewSample } from "../../managers/samples/MySounds"

export const NewSample = ({ token }) => {
  const [sample, setSample] = useState({})
  const [instrument, setInstruments] = useState([])
  const [genres, setGenres] = useState([])
  const [sampGenres, setSampGenres] = useState(new Set())

  const navigate = useNavigate()

  const genArr = (genId) => {
    let copy = new Set(sampGenres)
    copy.has(genId) ? copy.delete(genId) : copy.add(genId)
    setSampGenres(copy)
  }

  const [currentSample, setCurrentSample] = useState({
    producer: parseInt(token),
    file_url: "",
    file_name: "",
    instrument: 0,
    genre: [],
  })

  useEffect(() => {
    getInstruments().then((data) => {
      setInstruments(data)
    })
  }, [])

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data)
    })
  }, [])

  const handleNewPostInfo = (domEvent) => {
    const copy = { ...currentSample }
    copy[domEvent.target.name] = domEvent.target.value
    setCurrentSample(copy)
  }

  return (
    <form className="addNewPostForm">
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="file_name"
            required
            autoFocus
            className="title-form-control"
            placeholder="File name"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="file_url"
            required
            autoFocus
            className=""
            placeholder="Soundcloud url"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <select
            name="instrument"
            className="form-control"
            value={sample.instrument}
            onChange={handleNewPostInfo}
          >
            <option value="0">Instrument</option>
            {instrument.map((i) => (
              <option key={`instrument--${i.id}`} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <select
            name="genre"
            className="form-control"
            value={sample.genre}
            onChange={handleNewPostInfo}
          >
            <option value="0">Genre</option>
            {genres.map((g) => (
              <option key={`genre--${g.id}`} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="publish"
        className="publishFormButton"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault()

          const sample = {
            file_url: currentSample.file_url,
            file_name: currentSample.file_name,
            instrument: parseInt(currentSample.instrument),
            genre: parseInt(currentSample.genre),
            producer: currentSample.producer,
          }

          // Send POST request to your API
          addNewSample(sample).then(() => navigate("/mysounds"))
        }}
      >
        Submit
      </button>
    </form>
  )
}

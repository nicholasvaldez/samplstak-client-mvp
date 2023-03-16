import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGenres } from "../../managers/genres/Genres"
import { getInstruments } from "../../managers/instruments/Instruments"
import { addNewSample, updateSample } from "../../managers/samples/MySounds"
import { getSingleSample } from "../../managers/samples/SampleManager"

export const SampleForm = ({ token }) => {
  const [sample, setSample] = useState({})
  const [instrument, setInstruments] = useState([])
  const [genres, setGenres] = useState([])
  const [sampGenres, setSampGenres] = useState(new Set())

  const { sampleId } = useParams()
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
    if (sampleId) {
      getSingleSample(`${sampleId}`).then((data) => {
        setCurrentSample(data)

        const genreSet = new Set()
        for (const genre of data.genre) {
          genreSet.add(genre.id)
        }
        setSampGenres(genreSet)
      })
    }
  }, [sampleId])

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
            defaultValue={currentSample.file_name}
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
            defaultValue={currentSample.file_url}
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <select
            name="instrument"
            className="form-control"
            value={currentSample.instrument.id}
            onChange={handleNewPostInfo}
          >
            {instrument.map((i) => (
              <option key={`instrument--${i.id}`} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="content" className="label">
          Genres:{" "}
        </label>
        {genres.map((g) => {
          // Compare current `id` and see if on object exists with that id in currentGame.categories
          const foundGenre = currentSample.genre.find(
            (sampleGenre) => g.id === sampleGenre.id
          )

          return (
            <div key={`genre--${g.id}`}>
              <input
                type="checkbox"
                name={g.label}
                defaultChecked={foundGenre}
                onClick={() => genArr(g.id)}
              />
              <label htmlFor={g.label}>{g?.label}</label>
              <br />
            </div>
          )
        })}
      </div>
      <button
        type="publish"
        className="btn btn-primary"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault()

          const sample = {
            file_url: currentSample.file_url,
            file_name: currentSample.file_name,
            instrument: parseInt(currentSample.instrument),
            genre: Array.from(sampGenres),
            producer: currentSample.producer,
          }

          // Send POST request to your API

          if (sampleId) {
            updateSample(sampleId, sample).then(() => navigate("/mysounds"))
          } else {
            addNewSample(sample).then(() => navigate("/mysounds"))
          }

          /* updateSample(sampleId, sample).then(() => navigate("/mysounds")) */
        }}
      >
        Submit
      </button>
    </form>
  )
}

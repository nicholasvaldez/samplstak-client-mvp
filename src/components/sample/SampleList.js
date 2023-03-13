import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getSamples } from "../../managers/SampleManager"
import "./samples.css"

export const SampleList = (props) => {
  const [samples, setSamples] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getSamples().then((data) => setSamples(data))
  }, [])

  return (
    <>
      <article className="samples">
        {samples.map((sample) => {
          return (
            <section key={`sample--${sample.id}`} className="sample">
              <div className="sample__play">
                <h2 className="sample__play-button">
                  <a href={sample.file_url}>&gt;</a>
                </h2>
              </div>
              <div className="sample__url">
                {sample.file_name} by {sample.producer}
              </div>

              <div className="sample__instrument">
                {sample.instrument.label}
              </div>
              <div className="sample__genre">
                {sample.genre.map((genre) => genre.label).join(", ")}
              </div>
              <button className="button">+</button>
            </section>
          )
        })}
      </article>
    </>
  )
}

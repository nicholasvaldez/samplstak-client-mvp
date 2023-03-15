import { addToCollection } from "../../managers/samples/Collection"

export const MySoundsSamples = ({
  id,
  fileUrl,
  fileName,
  producer,
  instrument,
  genre,
}) => {
  const handleAddToCollection = () => {
    addToCollection({ sample: id })
  }

  return (
    <section key={`sample--${id}`} className="sample">
      <h2 className="sample__play-button">
        <a href={fileUrl}>&gt;</a>
      </h2>
      <div className="sample__url">
        {fileName} by {producer}
      </div>

      <div className="sample__instrument">{instrument}</div>
      <div className="sample__genre">{genre}</div>
      <button
        className="button"
        onClick={() => {
          handleAddToCollection()
        }}
      >
        +
      </button>
    </section>
  )
}

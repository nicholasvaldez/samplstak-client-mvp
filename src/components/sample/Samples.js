export const Samples = ({
  id,
  fileUrl,
  fileName,
  producer,
  instrument,
  genre,
}) => {
  return (
    <section key={`sample--${id}`} className="sample">
      <div className="sample__play">
        <h2 className="sample__play-button">
          <a href={fileUrl}>&gt;</a>
        </h2>
      </div>
      <div className="sample__url">
        {fileName} by {producer}
      </div>

      <div className="sample__instrument">{instrument}</div>
      <div className="sample__genre">{genre}</div>
      <button className="button">+</button>
    </section>
  )
}

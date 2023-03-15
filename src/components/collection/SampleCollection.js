export const SampleCollection = ({
  id,
  fileUrl,
  fileName,
  producer,
  instrument,
  genre,
}) => {
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
    </section>
  )
}

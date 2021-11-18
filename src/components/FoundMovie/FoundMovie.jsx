import React from 'react'

export default function FoundMovie({ result, openDetail }) {
	return (
		<div className="result" onClick={() => openDetail(result.imdbID)}>
			<img src={result.Poster} />
			<h3>{result.Title}</h3>
		</div>
	)
}
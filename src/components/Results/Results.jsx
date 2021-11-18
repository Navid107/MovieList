import React from 'react'

import Result from '../../components/FoundMovie/FoundMovie'

export default function Results ({ results, openDetail }) {
	return (
		<section className="results">
			{results.map(result => (
				<Result key={result.imdbID} result={result} openDetail={openDetail} />
			))}
		</section>
	)
}
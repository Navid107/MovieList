import React from 'react'

import Result from '../../components/FoundMovie/FoundMovie'

export default function Results ({ results, openDetail }) {
	console.log(results)
	return (
		<section className="results">
			{results.map(result => (
				<div>
			
				<Result key={result.favorite.imdbID} result={result.favorite} openDetail={openDetail} />
				</div>
			))}
		</section>
	)
}
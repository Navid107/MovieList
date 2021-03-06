import React from 'react'

import Result from '../../components/FoundMovie/FoundMovie'

export default function Results ({ results, openDetail }) {
	console.log(results)
	return (
		<section className="results">
			{results.map(result => (
				<div>
				<h1>{result.title}</h1> 
			
				<Result key={result.imdbID} result={result} openDetail={openDetail} />
				</div>
			))}
		</section>
	)
}
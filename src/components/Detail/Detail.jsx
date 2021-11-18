import React from 'react'

export default function Detail({ selected, closeDetail }) {
	return (
		<section className="detail">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
				</div>
				<button className="close" onClick={closeDetail}>Close</button>
			</div>
		</section>
	)
}
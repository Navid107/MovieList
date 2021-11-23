import React from 'react'

export default function Detail({ selected, closeDetail, addToFavorite, remove }) {
	console.log(selected)
	return (
		<section className="detail">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>

				<div className="plot">
					<img src={selected.Poster} />
					<p>
						Actors: {selected.Actors}
						<br />
						Rating: {selected.imdbRating}
						<br />
						Rated: {selected.Rated}
						<br />
						Genre: {selected.Genre}
						<br />
						Runtime: {selected.Runtime}
						<br />
						{selected.Plot}	
					</p>


				</div>
				<button className="close" onClick={closeDetail}>Close</button>
				{!selected.favorited
					? <button className="favoritBtn" onClick={addToFavorite}>Favorite</button>
					: <button className="favoritBtn" onClick={remove}>Remove</button>
				}

			</div>
		</section>
	)
}

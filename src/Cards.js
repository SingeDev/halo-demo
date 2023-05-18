import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Cards({ cards }) {
	return (
		<>
			<h1>HALO</h1>
			{!cards ? (
				'🦀 Loading...'
			) : (
				<ul>
					{cards.map(({ id, title }) => (
						<li key={id}>
							<Link to={`/cards/${id}`}>{title}</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}

Cards.propTypes = {
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
};

export default Cards;

import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function Card({ cards }) {
	const { id } = useParams();

	const card = cards.find((x) => x.id === id);

	return <h1>{card.title}</h1>;
}

Card.propTypes = {
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		})
	),
};

export default Card;

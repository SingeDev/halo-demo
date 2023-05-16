import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function Image({ url, description }) {
	return (
		<div>
			<img src={url} height={300} alt="" />
			<p>{description}</p>
		</div>
	);
}

Image.propTypes = {
	url: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

function Card({ cards }) {
	const { id } = useParams();

	const card = cards.find((x) => x.id === id);

	return (
		<>
			<h1>{card.title}</h1>
			<p>{card.description}</p>
			<p>{card.tags.join(', ')}</p>
			<Image url={card.image1.url} description={card.imageDescription1} />
			<Image url={card.image2.url} description={card.imageDescription2} />
			<Image url={card.image3.url} description={card.imageDescription3} />
			<Image url={card.image4.url} description={card.imageDescription4} />
		</>
	);
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

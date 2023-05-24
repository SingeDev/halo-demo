import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

function Body({ cards, errors }) {
	if (errors.length > 0) {
		return (
			<p>Something went wrong: ${errors.map((x) => x.message).join(';')}</p>
		);
	}

	if (!cards) {
		return <p>🦀 Loading...</p>;
	}

	return (
		<ul>
			{cards.map(({ id, title }) => (
				<li key={id}>
					<Link to={`/cards/${id}`}>{title}</Link>
				</li>
			))}
		</ul>
	);
}

function Cards({ cards, errors }) {
	return (
		<>
			<Logo height={50} />
			<Body cards={cards} errors={errors} />
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
	errors: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number.isRequired,
			message: PropTypes.string.isRequired,
		})
	),
};

Body.propTypes = Cards.propTypes;

export default Cards;

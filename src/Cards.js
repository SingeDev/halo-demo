import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Grid } from 'tamia';
import { Logo } from './Logo';
import { Button } from './Button';

function Body({ cards, errors, onSelect }) {
	if (errors.length > 0) {
		return (
			<p>Something went wrong: ${errors.map((x) => x.message).join(';')}</p>
		);
	}

	if (!cards) {
		return <p>🦀 Loading...</p>;
	}

	return (
		<Grid gap="m" gridTemplateColumns="repeat(1fr)" maxWidth={400} mx="auto">
			{cards.map(({ id, title }) => (
				<Button key={id} to={`/cards/${id}`} onClick={() => onSelect(id)}>
					{title}
				</Button>
			))}
		</Grid>
	);
}

function Cards({ cards, errors, onSelect }) {
	return (
		<Stack gap="l">
			<Logo height={50} />
			<Body cards={cards} errors={errors} onSelect={onSelect} />
		</Stack>
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
	onSelect: PropTypes.func.isRequired,
};

Body.propTypes = Cards.propTypes;

export default Cards;

import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Box, Stack, Heading, Text, Image } from 'tamia';

function Illustration({ index, url, description }) {
	return (
		<Stack gap="s">
			<Box maxWidth={400}>
				<Image src={url} alt="" />
			</Box>
			<Text>
				{index}. {description}
			</Text>
		</Stack>
	);
}

Illustration.propTypes = {
	index: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

function Card({ cards }) {
	const { id } = useParams();

	const card = cards.find((x) => x.id === id);

	return (
		<Stack gap="l">
			<Stack gap="m">
				<Heading level={1}>{card.title}</Heading>
				<Text variant="description">{card.description}</Text>
			</Stack>
			<Illustration
				index={1}
				url={card.image1.url}
				description={card.imageDescription1}
			/>
			<Illustration
				index={2}
				url={card.image2.url}
				description={card.imageDescription2}
			/>
			<Illustration
				index={3}
				url={card.image3.url}
				description={card.imageDescription3}
			/>
			<Illustration
				index={4}
				url={card.image4.url}
				description={card.imageDescription4}
			/>
		</Stack>
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

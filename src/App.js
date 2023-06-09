import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TamiaRoot, Box } from 'tamia';
import theme from './theme';
import Cards from './Cards';
import Card from './Card';

const API_ENDPOINT = 'https://halo-api.onrender.com/v1/cards';
const API_TOKEN = '20e3e3b2-3a04-4af9-a671-7674c206332b';

function App() {
	const [cards, setCards] = useState(null);
	const [errors, setErrors] = useState([]);

	const handleSelection = async (id) => {
		const timestamp = new Date().toISOString();
		const url = `${API_ENDPOINT}/${id}/select?timestamp=${encodeURIComponent(
			timestamp
		)}&userId=pollero&lat=41.34&lon=2.34`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'X-Auth-Token': API_TOKEN,
			},
		});
		if (!response.ok) {
			throw new Error(
				`Failed to save card selection (${response.status} ${response.statusText})`
			);
		}
		const results = await response.json();
		if (results.erorrs) {
			setErrors(results.errors);
		}
	};

	useEffect(() => {
		const fetchCards = async () => {
			const url = `${API_ENDPOINT}?category=Bus&userId=pollero&lat=41.34&lon=2.34`;
			const response = await fetch(url, {
				headers: {
					'X-Auth-Token': API_TOKEN,
				},
			});
			if (!response.ok) {
				throw new Error(
					`Failed to fetch cards (${response.status} ${response.statusText})`
				);
			}
			const results = await response.json();
			if (results.erorrs) {
				setErrors(results.errors);
			} else {
				setCards(results.data);
			}
		};

		fetchCards();
	}, []);

	return (
		<TamiaRoot theme={theme}>
			<Box py="xl">
				<Router>
					<Switch>
						<Route path="/cards/:id">
							<Card cards={cards} />
						</Route>
						<Route path="/">
							<Cards cards={cards} errors={errors} onSelect={handleSelection} />
						</Route>
					</Switch>
				</Router>
			</Box>
		</TamiaRoot>
	);
}

export default App;

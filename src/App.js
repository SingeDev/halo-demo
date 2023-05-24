import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cards from './Cards';
import Card from './Card';

const API_ENDPOINT = 'https://halo-api.onrender.com/v1/cards';
const API_TOKEN = '20e3e3b2-3a04-4af9-a671-7674c206332b';

function App() {
	const [cards, setCards] = useState(null);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(API_ENDPOINT, {
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
		<div className="App">
			<Router>
				<Switch>
					<Route path="/cards/:id">
						<Card cards={cards} />
					</Route>
					<Route path="/">
						<Cards cards={cards} errors={errors} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

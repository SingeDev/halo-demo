import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cards from './Cards';
import Card from './Card';

const API_ENDPOINT = 'https://halo-api.onrender.com/v1/cards';

function App() {
	const [cards, setCards] = useState(null);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(API_ENDPOINT);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch cards (${response.status} ${response.statusText})`
				);
			}
			const results = await response.json();
			setCards(results);
		};

		fetchCards();
	}, []);

	return (
		<div className="App">
			<Router>
				{!cards ? (
					'🦀 Loading...'
				) : (
					<>
						<Switch>
							<Route path="/cards/:id">
								<Card cards={cards} />
							</Route>
							<Route path="/">
								<Cards cards={cards} />
							</Route>
						</Switch>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;

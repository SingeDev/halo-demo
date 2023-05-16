import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GraphQLClient } from 'graphql-request';
import Cards from './Cards';
import Card from './Card';

const token =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODQyNDA3NTEsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2xob2ozbG03NW84aDAxdDljOTJsZmVjNi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNGNmYzZkMmEtMTJmZS00NTIwLThhYmUtZGY1ZDU5NTU3YzIzIiwianRpIjoiY2xocTlnZ3R2MDdzYjAxdWcxMmVnYXcydSJ9.swfi5xfa44M5SuX6fAab-ORDekV1W-b_qNdWoBBP-oPqY4XXVkgIVeDejUIL9lvicY7O_iIHHA8jbY6TYesmk-dCxFwv86FlneEWq4eWC3bQ6lW9xlRBbbZBA4VI5D5shxYkHILpDBb4STJPQgmGBRC9-khGcP4TbJ2xHVoUds6ObzhTYJpagT-h7QoBg60RBSMCib2EQTb5Ber1N03NjF8pX-JqVKBZR0TbAuZcGw4QwouqdgrulQMIXIvj5rcpIWqSYwe9W52aWK3QD_bBKFDYPFtiUPhXGht8V72xZLTUgXi6sPO7m4aKH2cY9nx0rNGscVOnYrG1Z7NVlgTTo9i1BcK3tjeWMiRb1f0ErMy_Er0zPB2hIrlut-WdLLrfeev38G6gv6ysUe98QtghQTmlbnEDvOsQm6YiVndV1pL6wry0wvDzr7IoT1y34b8pEU7VdvMYjUvJ2au-tiu0VxYlrcPhDL1IYRXRQpYN2Twsi1h-s19Rm0rxpU_EzzYQJ7ie8VMddyR0WTziLKxsbZd6BJlQ2xyCn6u-uW6KbvOdd-bB9f7d3NiuENTq_zlqm-b8K4KlWMd83ZwXKQG-Y9pVsRzPNzCWPKJzEcgZ0R4J6uOWleiVPJLE9Ks-7HI8YtOmoOSJsOPuntPQJ7Uq0n3Bc0ZJKjYNOoP1OHpLfnU';

const client = new GraphQLClient(
	`https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clhoj3lm75o8h01t9c92lfec6/master`,
	{
		headers: {
			authorization: `Bearer ${token}`,
		},
	}
);

function App() {
	const [cards, setCards] = useState(null);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await client.request(
				`
      {
        cards {
			id
			title
			description
			image1 { url }
			image2 { url }
			image3 { url }
			image4 { url }
			imageDescription1
			imageDescription2
			imageDescription3
			imageDescription4
        }
      }
    `
			);

			setCards(response.cards);
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

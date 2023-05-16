import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { request } from "graphql-request";

const API_URL = "https://api-eu-central-1.hygraph.com/v2/ck8sn5tnf01gc01z89dbc7s0o/master"

import Card from "./Card";

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      const { cards } = await request(
        API_URL,
        `
      {
        cards {
          id
          title
        }
      }
    `
      );

      setCards(cards);
    };

    fetchCards();
  }, []);

  return (
    <div className="App">
      <Router>
        {!cards ? (
          "🦀 Loading..."
        ) : (
          <React.Fragment>
            <ul>
              {cards.map(({ id, title }) => (
                <li key={id}>
                  <Link to={`/cards/${id}`}>{title}</Link>
                </li>
              ))}
            </ul>
            <Switch>
              <Route path="/card/:id">
                <Card cards={cards} />
              </Route>
            </Switch>
          </React.Fragment>
        )}
      </Router>
    </div>
  );
}

export default App;

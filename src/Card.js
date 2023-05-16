import React from "react";
import { useParams } from "react-router-dom";

function Card({ cards }) {
  const { id } = useParams();

  const card = cards.find((card) => card.id === id);

  return <h1>{card.title}</h1>;
}

export default Card;

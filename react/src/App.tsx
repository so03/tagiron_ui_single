import { useEffect, useState } from "react";
import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: "http://localhost:3000/api",
});

function App() {
  return (
    <>
      <Card.Cards />
      <Members />
    </>
  );
}

function Members() {
  type Member = {
    name: string;
  };
  const [members, setMembers] = useState<null | Member[]>(null);
  useEffect(() => {
    axios.get("/rooms/1/members").then((res) => {
      setMembers(res.data);
    });
  }, []);

  if (!members) {
    return null;
  }
  return (
    <>
      {members.map((member, i) => (
        <p key={i}>{member.name}</p>
      ))}
    </>
  );
}

namespace Card {
  type Card = {
    color: string;
    number: number;
  };

  export function Cards() {
    const [cards, setCards] = useState<null | Card[]>(null);
    useEffect(() => {
      axios.get("/cards").then((res) => setCards(res.data));
    }, []);

    if (!cards) {
      return null;
    }
    return (
      <div className="flex gap-4">
        {cards.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    );
  }

  type CardProps = {
    card: Card;
  };

  function Card({ card }: CardProps) {
    const color = cardColor(card);

    return <div className={`p-4 cursor-pointer ${color}`}>{card.number}</div>;
  }

  function cardColor(card: Card) {
    let color = null;
    if (card.color === "red") {
      color = "text-red-400";
    } else if (card.color === "blue") {
      color = "text-blue-400";
    } else if (card.color === "yellow") {
      color = "text-yellow-400";
    }
    return color;
  }
}

export default App;

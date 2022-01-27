import React, { useEffect, useState } from "react";
import axiosBase from "axios";
import { Routes, Route, Link } from "react-router-dom";

const axios = axiosBase.create({
  baseURL: "http://localhost:3000/api",
});

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game" element={<Game />} />
      <Route path="room" element={<Room />} />
    </Routes>
  );
}

function Home() {
  return (
    <>
      <h1>Tagiron</h1>
      <Link to="/game">Game</Link> | <Link to="/room">Room</Link>
    </>
  );
}

function Room() {
  return (
    <>
      <Members />
      <RoomForm />
    </>
  );
}

function Game() {
  return (
    <>
      <Question.Questions />
      <Card.Cards />
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

function RoomForm() {
  const [name, setName] = helpers.useInput("");
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    axios
      .post("/rooms/1/members", { name })
      .then((res) => {
        // TODO: notice
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onInput={setName}
          type="text"
          className="border-2 p-2"
          placeholder="Enter your name"
        />
        <button type="submit">Join!</button>
      </form>
    </>
  );
}

namespace Question {
  type Question = {
    text: string;
    selected: boolean;
  };
  export function Questions() {
    const [questions, setQuestions] = useState<null | Question[]>(null);
    useEffect(() => {
      axios.get("/questions").then((res) => setQuestions(res.data));
    }, []);

    if (!questions) {
      return null;
    }
    return (
      <>
        {questions.map((question, i) => (
          <Question key={i} question={question} />
        ))}
      </>
    );
  }

  type QuestionProps = {
    question: Question;
  };
  function Question({ question }: QuestionProps) {
    return (
      <div
        className={`
          ${question.selected ? "text-blue-400" : "text-black"}
          cursor-pointer
        `}
      >
        {question.text}
      </div>
    );
  }
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

namespace helpers {
  export function useInput(
    initialValue: string
  ): [string, (e: React.FormEvent<HTMLInputElement>) => void] {
    const [value, setValue] = useState<string>(initialValue);
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    };

    return [value, handleInput];
  }
}

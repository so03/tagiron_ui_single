import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <>
      <Members />
      hello
    </>
  );
}

function Members() {
  type Member = {
    name: string;
  };
  const [members, setMembers] = useState<null | Member[]>(null);
  useEffect(() => {
    axios.get("/api/rooms/1/members").then((res) => {
      setMembers(res.data);
    });
  }, []);

  if (!members) {
    return null;
  }
  return (
    <>
      {members.map((member) => (
        <p>{member.name}</p>
      ))}
    </>
  );
}

export default App;

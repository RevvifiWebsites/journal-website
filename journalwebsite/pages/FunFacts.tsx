import { useState, useEffect, ReactElement } from 'react';
import styles from "../styles/FunFacts.module.css";
import data from "../data.json";

export default function FunFacts() {
  const [funFacts, setFunFacts] = useState([] as {
    id: string;
    content: string;
    createdAt: string;
    articleId : string;
  }[]);
  useEffect(() => {
    fetch("/api/getfunfacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        take: 10,
        random: true,
      }),
    }).then((res) => res.json()).then((data) => {
      setFunFacts(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className="heading-2">Fun Facts 🤯</h2>
      <ul>
        {funFacts.map((fact) => (
          <li key={fact.id}>
            <p>{fact.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useState, useEffect, ReactElement } from 'react';
import styles from "../styles/FunFacts.module.css";
import data from "../data.json";
interface FunFactsProp {
  published?: boolean;
  take?: number;
  random?: boolean;
  admin?: boolean;
  width?: string;
}
export default function FunFacts(props : FunFactsProp) {
  const [funFacts, setFunFacts] = useState([] as {
    id: string;
    content: string;
    createdAt: string;
    articleId : string;
  }[]);
  useEffect(() => {
    fetch(props.published ? "/api/getunpublishedfacts" :"/api/getfunfacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        take: props.take || 10,
        random: props.random || true,
      }),
    }).then((res) => res.json()).then((data) => {
      setFunFacts(data);
    });
  }, []);

  return (
    <div className={styles.container} style = {{
      width: props.width || "100%",
    }}>
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
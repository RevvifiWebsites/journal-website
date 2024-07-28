import { useState, useEffect, ReactElement } from 'react';
import styles from "../styles/FunFacts.module.css";
import data from "../data.json";

export default function FunFacts() {
  const [selectedFacts, setSelectedFacts] = useState<ReactElement[]>([]);

  useEffect(() => {
    function getRandomFacts(numOfFacts: number): ReactElement[] {
      const allFacts = data.map(thisFact => (
        <li className={styles.list}>{thisFact.fact}</li>
      ));
      
      const selected: ReactElement[] = [];
      for (let i = 0; i < numOfFacts; i++) {
        const randomIndex = Math.floor(Math.random() * allFacts.length);
        selected.push(allFacts[randomIndex]);
      }
      return selected;
    }

    setSelectedFacts(getRandomFacts(7));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className="heading-2">Fun Facts 🤯</h2>
      <ul>
        {selectedFacts}
      </ul>
    </div>
  );
}
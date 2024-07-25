// import styles from "../styles/FunFacts.module.css"
// import data from "../data.json"
// import { JSX, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from "react"

// export default function FunFacts() {
//     const factElements = data.map(thisFact => {
//         return <li className={styles.list}>{thisFact.fact}</li>
//     })

//     const selectedFacts : any = []

//     function getRandomFacts(numOfFacts:number) {
//         for (let index = 0; index < numOfFacts; index++) {
//             const randomIndex = Math.floor(Math.random() * factElements.length)
//             selectedFacts.push(factElements[randomIndex])
//         }
//     }
      
//     getRandomFacts(7);
//     console.log(selectedFacts)

//     return (
//         <div className={styles.container}>
//             <h2 className="heading-2">Fun Facts 🤯</h2>
//             <ul>
//                 {selectedFacts}
//             </ul>
//         </div>
//     )
// }

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
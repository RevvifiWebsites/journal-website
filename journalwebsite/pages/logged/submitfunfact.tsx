import { useEffect, useState } from "react";
import SideBar from "../sidebar";
import styles from "@/styles/Write.module.css";

export default function SubmitFunFact() {

  const [numfacts, setNumFacts] = useState(1);
  useEffect(() => {
    const submittedFacts = document.getElementById("submmitedfacts");
    if (submittedFacts) {
      const lastChild = submittedFacts.children[submittedFacts.children.length - 1];
      if (lastChild) {
        const inputElement = lastChild.children[0] as HTMLElement;
        if (inputElement) {
          inputElement.focus();
        }
      }
    }
  }, [numfacts])
    return (<>
    <SideBar/>
    <div className = {styles.page}>
        <div className = {styles.pageContent}>
            <h2>Submit Fun Facts</h2>
            <ol id="submmitedfacts" className={styles.factslist}>
            {Array.from({ length: numfacts }).map((_, i) => (
              <li key={i} className = {
                styles.factslistitem
              }>
                <input
                  placeholder="Enter Fun Fact"
                  className={styles.textinput}
                  onKeyDown    = {(e) => {
                    if(e.key == "Enter"){
                      setNumFacts(numfacts + 1);
                    }
                  }}
                ></input>
                <button
                  className={styles.removebutton}
                  onClick={(e) => {
                    const targetElement = e.target as HTMLElement;
                    const list =
                      targetElement.parentElement?.parentElement?.children;
                    if (list) {
                      for (let i = 0; i < list?.length; i++) {
                        if (list[i] == targetElement.parentElement) {
                          list[i].remove();
                        }
                      }
                    }
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ol>
          <button
            className={styles.submitbutton}
            onClick={(e) => {
              setNumFacts(numfacts + 1);
            }}
          >
            Add Fun Fact
          </button>
          <button className={styles.submitbutton} onClick = {() => {
            let facts = Array.from(document.getElementById("submmitedfacts")?.children as HTMLCollectionOf<HTMLElement>);
            let  factvalue = facts.map((fact) => (fact.children[0] as HTMLInputElement).value);
            factvalue = factvalue.filter((fact) => fact != "");
            console.log(factvalue);
            fetch("/api/submitfunfact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({facts: factvalue}),
                }).then((res) => {
                })
          }}>Submit Fun Facts</button>
        </div>
    </div>
    </>)
}
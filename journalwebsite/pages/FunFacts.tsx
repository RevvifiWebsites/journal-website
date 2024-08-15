import { useState, useEffect, ReactElement } from "react";
import styles from "../styles/FunFacts.module.css";
import data from "../data.json";
import Image from "next/image";
interface FunFactsProp {
  take?: number;
  random?: boolean;
  admin?: boolean;
  width?: string;
  facts?: any[];
}
export default function FunFacts(props: FunFactsProp) {
  const [funFacts, setFunFacts] = useState(
    [] as {
      id: string;
      content: string;
      createdAt: string;
      articleId: string;
      author: any;
      article: any;
    }[]
  );
  useEffect(() => {
    if (props.facts) {
      console.log(props.facts);
      setFunFacts(props.facts);
    } else {
      fetch(props.admin ? "/api/getunpublishedfacts" : "/api/getfunfacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          take: props.take || 10,
          random: props.random || true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFunFacts(data);
        });
    }
  }, []);
  useEffect(() => {
    if (props.facts) {
      setFunFacts(props.facts);
    }
  }, [props.facts]);
    return (
    <div
      className={styles.container}
      style={{
        width: props.width || "100%",
      }}
    >
      <h2 className="heading-2">Fun Facts 🤯</h2>
      <ul>
        {funFacts.length > 0 ? funFacts.map((fact) => (
          <li key={fact.id}>
            <p>{fact.content}</p>
            {props.admin && (
              <p className={styles.info}>
                by: {fact.author.name} |{" "}
                {new Date(fact.createdAt).toLocaleDateString()}
              </p>
            )}
            {props.admin && (
              <div className={styles.admin}>
                <button
                  className={styles.adminbutton}
                  onClick={() => {
                    setFunFacts(funFacts.filter((f) => f.id !== fact.id));
                    fetch("/api/approvefact", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: fact.id,
                      }),
                    });
                  }}
                >
                  <Image
                    src="/icons/tick.svg"
                    width={20}
                    height={20}
                    alt="plus"
                  ></Image>
                  Approve
                </button>
                <button
                  className={styles.adminbutton}
                  onClick={() => {
                    setFunFacts(funFacts.filter((f) => f.id !== fact.id));
                    fetch("/api/rejectfact", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: fact.id,
                      }),
                    });
                  }}
                >
                  <Image
                    src="/icons/cross.svg"
                    width={20}
                    height={20}
                    alt="X"
                  ></Image>
                  Reject
                </button>
              </div>
            )}
          </li>
        )) : <p>No fun facts to show</p>}
        {props.admin && (
          <button
            className={styles.loadbutton}
            onClick={() => {
              fetch("/api/getunpublishedfacts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  take: props.take || 10,
                  start: funFacts.length,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  setFunFacts(funFacts.concat(data));
                });
            }}
          >
            load more
          </button>
        )}
      </ul>
    </div>
  );
}

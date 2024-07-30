import styles from "../styles/OtherWorks.module.css"

export default function OtherWorks(props: any) {
    return (
        <div className={styles.container}>
            <img src={props.image} style={{cursor: 'pointer'}}/>

            <div className={styles.textContent}>
                <p className="body-bold" style={{cursor: 'pointer'}}>{props.title}</p>
                <p className="body-secondary" style={{cursor: 'pointer'}}>{`by ${props.authorName} | ${props.publishDate} | ${props.views} views`}</p>
                <div className={styles.tags}>
                    <img src="/icons/tag.svg" />
                    <p className="body-secondary">{props.tags.join(", ")}</p>
                </div>
            </div>
        </div>
    )
}
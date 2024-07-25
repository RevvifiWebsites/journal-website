import styles from "../styles/OtherWorks.module.css"

export default function OtherWorks(props: any) {
    return (
        <div className={styles.container}>
            <img src={props.image} />

            <div className={styles.textContent}>
                <p className="body-bold">{props.title}</p>
                <p className="body-secondary">{`by ${props.authorName} | ${props.publishDate} | ${props.views} views`}</p>
                <div className={styles.tags}>
                    <img src="/icons/tag.svg" />
                    <p className="body-secondary">{props.tags.join(", ")}</p>
                </div>
            </div>
        </div>
    )
}
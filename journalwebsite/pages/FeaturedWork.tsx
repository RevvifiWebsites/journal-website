import styles from "../styles/FeaturedWork.module.css"

export default function FeaturedWork(props: any) {
    return (
        <div className={styles.container}>
            <img src={props.image} />
            <p className="body-bold">{props.title}</p>
            <p className="body-secondary">{`by ${props.authorName} | ${props.publishDate} | ${props.views} views`}</p>
            <div className={styles.tags}>
                <img src="/icons/tag.svg" />
                <p className="body-secondary">{props.tags.join(", ")}</p>
            </div>
        </div>
    )
}
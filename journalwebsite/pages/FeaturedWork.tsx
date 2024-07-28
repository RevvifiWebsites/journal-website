import styles from "../styles/FeaturedWork.module.css"

export default function FeaturedWork(props: any) {
    return (
        <div className={styles.container}>
            <img className={styles.thumbnail} src={props.image} draggable="false" style={{cursor: 'pointer'}}/>
            <p className="body-bold" style={{cursor: 'pointer'}}>{props.title}</p>
            <p className="body-secondary" style={{cursor: 'pointer'}}>{`by ${props.authorName} | ${props.publishDate} | ${props.views} views`}</p>
            <div className={styles.tags}>
                <img className={styles.tagIcon} src="/icons/tag.svg" />
                <p className="body-secondary">{props.tags.join(", ")}</p>
            </div>
        </div>
    )
}
import styles from '../styles/Popup.module.css'

export default function Popup(props : {
    popup : string | null,
    setPopup : any
}) {
    let {popup, setPopup} = props;
    return (
        <>
        {popup && <div className={styles.popup}>
        <div className={styles.popupcontent}>
          <p >{popup}</p>
          <button onClick = {() => {setPopup(null)}} className = {styles.popupbutton}>Close</button>
        </div>
        </div>}
        </>
    )
}
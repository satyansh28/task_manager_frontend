import styles from './Nav.module.css';
import img from '../imgs/notes.png';
const NavHeader=(props)=>{
    return(
        <div className={styles.topbar}>
                <div className={styles.tagline}>Plan your tasks,anywhere!</div>
                <img src={img} alt="notes"></img>
        </div>
    )
}
export default NavHeader;
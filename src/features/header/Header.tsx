import styles from "../dashboard/Dashboard.module.css"
import Search from "../operations/Search";
import img from "../../../src/logo.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>&there4;</span>
      <img className={styles.img} src={img}/>
      <span className={styles.nav}>Dashboard</span>
      <Search/>
    </div>
  )
}
export default Header;
import Filter from "./Filter";
import Search from "./Search";
import ClearAll from "./ClearAll";
import styles from "../Dashboard/Dashboard.module.css"

const Operations = () => {
  return (
    <div className={styles.operations}>
      {/* <Search/> */}
      <Filter/>
      {/* <ClearAll/> */}
    </div>

  );
}

export default Operations;
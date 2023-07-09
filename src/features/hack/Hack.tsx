import { useEffect } from "react";
import { fetchHackData } from "./hackSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectActiveCard, selectHackData } from "./hackSlice";
import Dashboard from "../dashboard/Dashboard";
import Operations from "../operations/Operations";
import styles from "./../Dashboard/Dashboard.module.css"
import Header from "../header/Header";

const Hack = () => {
  const dispatch = useAppDispatch()  
  const activeCard = useAppSelector(selectActiveCard)

  useEffect(() => {
    dispatch(fetchHackData())
  },[]);
  return(
    <div className={styles.main}>    
      <Header />
      <div className={styles.hack}>
        <Operations />
        <Dashboard/>
      </div>
    </div>    
  )

}

export default Hack;
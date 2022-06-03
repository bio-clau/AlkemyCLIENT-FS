import React, {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useAuth} from '../../context/auth';
import {getAllOp} from '../../redux/actions/a.operations';
import Chart from './Chart'

function UserStats() {
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    const dataChart = useSelector((state) => state.dataChart);


    useEffect(()=>{
        dispatch(getAllOp(currentUser.id, localStorage.getItem('USER_TOKEN')))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
  return (
    <div style={{maxWidth:700, marginLeft:'auto', marginRight:'auto'}}>{dataChart.labels && <Chart chartData={dataChart}/>}</div>
  )
}

export default UserStats
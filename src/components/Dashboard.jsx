import React, { useEffect, useState } from "react"
import useFetchAllData from "../utils/hooks/useFetchAllData"
import DataModel from "../utils/Models"
import AverageSessionsDuration from "./AverageSessionsDuration"
import DailyActivity from "./DailyActivity"
import KeyDataDisplay from "./KeyDataDisplay"
import Performance from "./Performance"


export default function Dashboard({ id=null }){
    const [ formatedData, setFormatedData ] = useState()
    const { data, loading, error } = useFetchAllData(id)
    
    useEffect(() => {
        if(data){
            const dataModel = new DataModel(data)
            setFormatedData(dataModel.all)
        }
    }, [data])

    return (
        <React.Fragment>
            {formatedData && 
                <div className="dashboard">
                    <div className="title">
                        <h1>Bonjour <span className="title__name">Thomas</span></h1>
                        <p className="title__text">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                    </div>
                    <div className="daily-activity">
                        <DailyActivity data={formatedData.activity} />
                    </div>
                    <div className="sessions-duration">
                        <AverageSessionsDuration  data={formatedData.averageSessions} />
                    </div>
                    <div className="performance">
                        <Performance  data={formatedData.performance} />
                    </div>
                    <div className="score"></div>
                    <div className="key-datas">
                        <KeyDataDisplay data={formatedData.keyData} />
                    </div>
                </div>
            }
        </React.Fragment>
        
    )
}
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useFetchAllData from "../utils/hooks/useFetchAllData"
import DataModel from "../utils/DataModel"
import AverageSessionsDuration from "./AverageSessionsDuration"
import DailyActivity from "./DailyActivity"
import KeyDataDisplay from "./KeyDataDisplay"
import Performance from "./Performance"
import Score from "./Score"
/**
 * @module Dashboard
 * @version 1.0.0
 * @author Sébastien GAULT
 */

/**
 * The main component that displays the user dashboard based on user's datas including :
 * the User's Name
 * The Daily Activity Bar Chart
 * The Average Sessions Duration line chart
 * The Performance Radar Chart
 * The Score Radial Chart
 * And the key data of the day
 * 
 * @memberof module:Dashboard
 * @function Dashboard
 * @returns {JSX.Element} 
*/
export default function Dashboard(){
    // get the user's id in the param of the request
    const { id } = useParams()
    const [ formatedData, setFormatedData ] = useState()

    //fetch all the data needed with the useFetchAllData() custom hook
    const { data, loading, error } = useFetchAllData(id)
    
    useEffect(() => {
        if(data && !error){
            const dataModel = new DataModel(data)
            setFormatedData(dataModel.all)
        }
    }, [data, error])

    return (
        <React.Fragment>
            {loading && <div className="dashboard__loader"></div>}
            { error && 
                <div className="dashboard__error">
                    <span>{error}</span>
                </div>
            }
            {formatedData && 
                <div className='dashboard'>
                    <div className="title">
                        <h1>Bonjour <span className="title__name">{formatedData.userName}</span></h1>
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
                    <div className="score">
                        <Score data={formatedData.score} />
                    </div>
                    <div className="key-datas">
                        <KeyDataDisplay data={formatedData.keyData} />
                    </div>
                </div>
            }
        </React.Fragment>
        
    )
}
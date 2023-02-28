import AverageSessionsDuration from "./AverageSessionsDuration"
import DailyActivity from "./DailyActivity"
import KeyDataDisplay from "./KeyDataDisplay"
import Performance from "./Performance"


export default function Dashboard({ id=null }){
    
    
    return (
        <div className="dashboard">
            <div className="title">
                <h1>Bonjour <span className="title__name">Thomas</span></h1>
                <p className="title__text">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className="daily-activity">
                <DailyActivity userId={id} />
            </div>
            <div className="sessions-duration">
                <AverageSessionsDuration userId={id} />
            </div>
            <div className="performance">
                <Performance userId={id} />
            </div>
            <div className="score"></div>
            <div className="key-datas">
                <KeyDataDisplay userId={id} />
            </div>
        </div>
    )
}
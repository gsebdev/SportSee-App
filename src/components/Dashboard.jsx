export default function Home(){
    return (
        <div className="dashboard">
            <div className="title">
                <h1>Bonjour <span className="title__name">Thomas</span></h1>
                <p className="title__text">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            <div className="daily-activity"></div>
            <div className="sessions-duration"></div>
            <div className="performance"></div>
            <div className="score"></div>
            <div className="key-datas"></div>
        </div>
    )
}
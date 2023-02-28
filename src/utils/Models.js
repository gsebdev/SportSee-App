export default class DataModel {
    constructor( data ){
        this._data = data
        if(this._data.user){
            this._userKeyData = this.formatKeyData()
            this._userScore = this.formatScoreData()
        }
        if(this._data.activity){
            this._userActivity = this.formatActivityData()
        }
        if(this._data.performance){
            this._userPerformance = this.formatPerformanceData()
        }
        if(this._data.averageSessions){
            this._userAverageSessions = this.formatAverageSessions()
        }
    }

    get all() {
        return {
            keyData: this._userKeyData,
            score: this._userScore,
            activity: this._userActivity,
            performance: this._userPerformance,
            averageSessions: this._userAverageSessions
        }
    }
    formatKeyData(){
        const keyData = this._data.user.keyData
        
        const formatValue = (value) => {
            return /^[0-9]+$/.test(value) ? new Intl.NumberFormat('en').format(value) : value
        }

        return [
            {
                value: formatValue(keyData.calorieCount),
                name: 'Calories',
                unit: 'kCal',
            },
            {
                value: formatValue(keyData.proteinCount),
                name: 'Proteines',
                unit: 'g',
            },
            {
                value: formatValue(keyData.carbohydrateCount),
                name: 'Glucides',
                unit: 'g',
            },
            {
                value: formatValue(keyData.lipidCount),
                name: 'Lipides',
                unit: 'g',
            }
        ]
   }

    formatScoreData(){
        return this._data.user.todayScore * 100
    }

    formatAverageSessions(){
        const weekDays = [ 'L', 'M', 'M', 'J', 'V', 'S', 'D' ]
        const sessions = this._data.averageSessions.data.sessions.map(session => {
            return {
                sessionLength: session.sessionLength,
                day: weekDays[ session.day - 1 ]
            }
        })

        const values = sessions.map(session => session.sessionLength)
        return {
            sessions: sessions,
            values: values
        }
    }

    formatPerformanceData(){
        const translateToFr = (text) => {
            const dictionary = {
                'endurance': 'endurance',
                'cardio': 'cardio',
                'intensity': 'intensité',
                'energy': 'energie',
                'speed': 'vitesse',
                'strength': 'force'
            }
            return dictionary[text] ? dictionary[text] : text
        }

        const performance = this._data.performance.data.data.map(data => {
                const ability = translateToFr(this._data.performance.data.kind[data.kind])
                return {
                    ability: ability.charAt(0).toUpperCase() + ability.slice(1) ,
                    value: data.value
                }
            })
        

        const fullMark = 1.125 * Math.max(performance.map(data => data.value))
        return {
            data: performance,
            fullMark: fullMark
        }
        
    }

    formatActivityData(){
        // keep only the day number of the date in 'day' property
        const sessions = this._data.activity.data.sessions.map(session => {
            const day = parseInt(session.day.slice(-2))
            return {...session, day: day}
        })
        const dayValues = sessions.map(session => session.day)
        const caloriesValues = sessions.map(session => session.calories)
        const kilogramValues = sessions.map(session => session.kilogram)

        return { 
            sessions: sessions, 
            days: dayValues, 
            calories: caloriesValues, 
            kilogram: kilogramValues 
        }
    }
}
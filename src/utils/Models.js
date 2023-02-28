class DailyActivityModel {
    constructor( data ) {
        this._data = data.data.sessions
        this._sessions = this.formatData()
        this._dayValues = this._sessions.map(session => session.day)
        this._caloriesValues = this._sessions.map(session => session.calories)
        this._kilogramValues = this._sessions.map(session => session.kilogram)
    }

    formatData() {
        // keep only the day number of the date in 'day' property
        return this._data.map(session => {
            const day = parseInt(session.day.slice(-2))
            return {...session, day: day}
        })
    }

    get sessions() {
        return this._sessions
    }
    get calories() {
        return this._caloriesValues
    }
    get kilogram() {
        return this._kilogramValues
    }
    get days() {
        return this._dayValues
    }
    
}

class AverageSessionsModel {
    constructor( data ) {
        this._data = data.data.sessions
        this._sessions = this.formatData()
        this._sessionLengthValues = this._sessions.map(session => session.sessionLength)
    }

    formatData() {
        const weekDays = [ 'L', 'M', 'M', 'J', 'V', 'S', 'D' ]
        return this._data.map(session => {
            return {
                sessionLength: session.sessionLength,
                day: weekDays[ session.day - 1 ]
            }
        })
    }

    get sessions() {
        return this._sessions
    }
    get values() {
        return this._sessionLengthValues
    }
}

class PerformanceModel {
    constructor( data ) {
        this._data = data.data
        this._maxValue = Math.max(...this._data.data.map(data => data.value))
        this._fullMark = this._maxValue + ( this._maxValue / 8 )
        this._performance = this.formatData()
    }
    translateToFr(text) {
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

    formatData() {
        return this._data.data.map(data => {
            const ability = this.translateToFr(this._data.kind[data.kind])
            return {
                ability: ability.charAt(0).toUpperCase() + ability.slice(1) ,
                value: data.value
            }
        })
    }
    get performance() {
        return { data: this._performance, fullMark: this._fullMark }
    }
}

export { DailyActivityModel, AverageSessionsModel, PerformanceModel }
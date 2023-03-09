/**
 * Class representing user's data Model that format raw API data to data ready to be used in the react components
 * @version 1.0.0
 * @author Sébastien GAULT
 * @class
 */
class DataModel {
    /**
     * @constructor
     * @param {{
     *  user: object,
     *  averageSessions: object,
     *  performance: object, 
     *  activity: object
     * }} data the data provided by the API
     */
    constructor( data ){
        this._data = data
        this._userKeyData = this.formatKeyData()
        this._userScore = this.formatScoreData()
        this._userName = this._data.user.userInfos.firstName
        this._userActivity = this.formatActivityData()
        this._userPerformance = this.formatPerformanceData()
        this._userAverageSessions = this.formatAverageSessions()
        
    }
    /**
     * Getter that returns an object containing all the formatted data.
     * @readonly
     * @return {object} all the formatted user's data
    */
    get all() {
        return {
            keyData: this._userKeyData,
            score: this._userScore,
            userName: this._userName,
            activity: this._userActivity,
            performance: this._userPerformance,
            averageSessions: this._userAverageSessions
        }
    }
    /**
     * Method that format the key data of the user
     * @private
     * @returns {array<{value: string, name: string, unit: string}>}
     */
    formatKeyData(){
        const { keyData } = this._data.user
        /** 
         * format number to english notation
         * 
         * @param {number|string} value number to format
         * @returns {string} formatted number
         * @private
         */
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
   /**
    * Method that format the user's today score
    * @private
    * @returns {{score: number}} object with a property `score` containing the users today's score 
    */
    formatScoreData(){
        return this._data.user.todayScore ? { score: this._data.user.todayScore * 100 } : { score: this._data.user.score * 100 }
    }
    /**
     * Method that format the user's average sessions duration data
     * @private
     * @returns {{sessions: array<{sessionsLength: number, day: string}>, values: array<number>}} formated average sessions duration user's data 
     */
    formatAverageSessions(){
        const weekDays = [ 'L', 'M', 'M', 'J', 'V', 'S', 'D' ]
        //replace the day number by a day letter
        const sessions = this._data.averageSessions.sessions.map(session => {
            return {
                sessionLength: session.sessionLength,
                day: weekDays[ session.day - 1 ]
            }
        })
        // get an array of numbers containing all the values
        const values = sessions.map(session => session.sessionLength)
        return {
            sessions: sessions,
            values: values
        }
    }
    /**
     * Method that format the user's performance data
     * 
     * @private
     * @returns {{abilities: array<{ability: string, value: number}>, fullMark: number}} an object with the translated abilities name and their values and the fullMark property
     */
    formatPerformanceData(){
        /** 
         * translate abilities to french
         * 
         * @param {string} text abiltity name in english
         * @returns {string} translated ability
         * @private
         */
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

        const performance = this._data.performance.data.map(data => {
                //translate to french the ability
                const ability = translateToFr(this._data.performance.kind[data.kind])
                return {
                    //Capitalize the ability name
                    ability: ability.charAt(0).toUpperCase() + ability.slice(1) ,
                    value: data.value
                }
            })
        // calculate the maximum value of the chart axis based on the max abilities value
        const fullMark =  1.125 * Math.max(...performance.map(data => data.value))

        return {
            abilities: performance,
            fullMark: fullMark
        }
        
    }
    /**
     * Method that format the daily activity user's data
     * @private
     * @returns {Object}
     */
    formatActivityData(){
        
        const sessions = this._data.activity.sessions.map(session => {
            // keep only the day number of the date in 'day' property
            const day = parseInt(session.day.slice(-2))
            return {...session, day: day}
        })
        //get an array of all the day values
        const dayValues = sessions.map(session => session.day)
        //get an array containing all the `calories` values
        const caloriesValues = sessions.map(session => session.calories)
        //get an array containing all the `kilogram` values
        const kilogramValues = sessions.map(session => session.kilogram)

        return { 
            sessions: sessions, 
            days: dayValues, 
            calories: caloriesValues, 
            kilogram: kilogramValues 
        }
    }
}

export default DataModel
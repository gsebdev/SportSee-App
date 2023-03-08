import SquareIcon from './SquareIcon'
import energy from '../images/energy.png'
import chicken from '../images/chicken.png'
import apple from '../images/apple.png'
import cheeseburger from '../images/cheeseburger.png'
import React from 'react'
import { PropTypes } from 'prop-types'
/**
 * @module KeyDataDisplay
 * @version 1.0.0
 * @author Sébastien GAULT
 */

/**
 * Component that displays the user key data with a specified icon and background
 * @memberof module:KeyDataDisplay
 * @param {object} props react props object that must contain :
 *   @param {array<{ value: string, name: string, unit: string }>} props.data formatted user's key datas
 * @return {JSX.Element} returns a react element
 */
function KeyDataDisplay({ data }) {
    
    //set the background color and icon file for each keydata
    const display = {
        calories: {
            bgColor: 'rgba(255, 0, 0, 0.1)',
            icon: energy
        },
        proteines: {
            bgColor: 'rgba(74, 184, 255, 0.1)',
            icon: chicken
        },
        glucides: {
            bgColor: 'rgba(249, 206, 35, 0.1)',
            icon: apple
        },
        lipides: {
            bgColor: 'rgba(253, 81, 129, 0.1)',
            icon: cheeseburger
        }
    }

    return (
        <React.Fragment>
            { data.map((keyData, index) => {
                    return (
                        <div key={keyData.name + index} className='key-data'>
                            <SquareIcon backgroundColor={display[keyData.name.toLowerCase()].bgColor} iconSrc={display[keyData.name.toLowerCase()].icon} />
                            <div className="key-data__text-container">
                                <span>{keyData.value}{keyData.unit}</span>
                                <h2>{keyData.name}</h2>
                            </div>
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

KeyDataDisplay.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        unit: PropTypes.string.isRequired
    })).isRequired
}

export default KeyDataDisplay
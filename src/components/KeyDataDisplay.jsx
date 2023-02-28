import SquareIcon from './SquareIcon'
import energy from '../images/energy.png'
import chicken from '../images/chicken.png'
import apple from '../images/apple.png'
import cheeseburger from '../images/cheeseburger.png'
import React from 'react'

export default function KeyDataDisplay({ data }) {
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
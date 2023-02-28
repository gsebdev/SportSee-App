import useFetch from '../utils/hooks/useFetch'
import SquareIcon from './SquareIcon'
import energy from '../images/energy.png'
import chicken from '../images/chicken.png'
import apple from '../images/apple.png'
import cheeseburger from '../images/cheeseburger.png'
import React, { useEffect, useState } from 'react'

export default function KeyDataDisplay({ userId }) {
    const [ formattedKeyData, setKeyData ] = useState([])
    const { data, loading, error } = useFetch('user', userId)
    
    function formatValue(value){
        return /^[0-9]+$/.test(value) ? new Intl.NumberFormat('en').format(value) : value
    }

    useEffect(() => {
       if(data){
            setKeyData([
                {
                    value: formatValue(data.keyData.calorieCount),
                    name: 'Calories',
                    unit: 'kCal',
                    bgColor: 'rgba(255, 0, 0, 0.1)',
                    icon: energy
                },
                {
                    value: formatValue(data.keyData.proteinCount),
                    name: 'Proteines',
                    unit: 'g',
                    bgColor: 'rgba(74, 184, 255, 0.1)',
                    icon: chicken
                },
                {
                    value: formatValue(data.keyData.carbohydrateCount),
                    name: 'Glucides',
                    unit: 'g',
                    bgColor: 'rgba(249, 206, 35, 0.1)',
                    icon: apple
                },
                {
                    value: formatValue(data.keyData.lipidCount),
                    name: 'Lipides',
                    unit: 'g',
                    bgColor: 'rgba(253, 81, 129, 0.1)',
                    icon: cheeseburger
                }
            ])
       }
         
    }, [data]
        
    )

    return (
        
        <React.Fragment>
            {loading && <div>loading</div>}
            {error && <div>Error</div>}
            { data &&
                formattedKeyData.map((keyData, index) => {
                    return (
                        <div key={keyData.name + index} className='key-data'>
                            <SquareIcon backgroundColor={keyData.bgColor} iconSrc={keyData.icon} />
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
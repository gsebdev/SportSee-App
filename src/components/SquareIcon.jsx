import PropTypes from 'prop-types'

/**
*React component for displaying a square whith an icon and with a custom background color.
*
* @param {Object} props
* @param {string} props.iconSrc  src for the icon image.
* @param {string} [props.backgroundColor] optional background color for the component.
* @param {string} [props.className] - optional classname for the container.
* @returns {React.ReactElement}
*/
export default function SquareIcon({ iconSrc, backgroundColor, className }){
    const style = backgroundColor ? {backgroundColor: backgroundColor} : {}
    return (
        <div 
            className={`square-icon ${className}`}
            style={style}
        >
            <img src={iconSrc} alt="" />
        </div>
    )
}

SquareIcon.propTypes = {
    iconSrc: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    className: PropTypes.string
}
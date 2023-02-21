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
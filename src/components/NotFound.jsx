/**
 * @module NotFound
 * @version 1.0.0
 * @author Sébastien GAULT
 */
/**
 * Component that displays an error 404 message
 * 
 * @memberof module:NotFound
 * @returns {JSX.Element} returns a react element with the error message
 */
function NotFound() {
    return (
        <div className="dashboard__error">
            <span>404 - Page non trouvée</span>
        </div>
    )
}
export default NotFound
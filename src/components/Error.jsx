/**
 * @module Error
 * @version 1.0.0
 * @author Sébastien GAULT
 */

import { Link, useRouteError } from "react-router-dom"
import PropTypes from 'prop-types'

/**
 * Component that displays the errors 
 * a prop 'error' can be provided or it can use the useRouteError hook to get the error message
 * If no error prop is provided neither a routeError, the default message is 404 error
 * 
 * @memberof module:Error
 * @param {object} props the react props object
 * @param {object} props.error the error object optional
 * @param {number} props.error.status the error status number
 * @param {string} props.error.statusText the error text
 * @returns {JSX.Element} returns a react element with the error message
 */
function Error({ error={status: 404, statusText: 'La page n\'existe pas'} }) {
    const routeError = useRouteError()
    error = routeError ? routeError : error

    return (
        <div className="dashboard__error">
            <h1>{error.status}</h1>
            <h2>{error.statusText}</h2>
            {error.status === 404 &&
                <div>
                    <span>Voici les liens actifs sur cette version de l'application</span>
                    <Link to='/user/12'>Dashboard utilisateur 12</Link>
                    <Link to='/user/18'>Dashboard utilisateur 18</Link>
                </div>
            }
        </div>
    )
}

Error.propTypes = {
    error: PropTypes.shape({
        status: PropTypes.number.isRequired,
        statusText: PropTypes.string
    })
}
export default Error
import React from 'react'
import './PnPButton.css'

const PnPButton = ({
        text,
        onClick,
        disabled = false,
        children,
        style = []
    }) => {
    return (
        <button
            className="pnp-button"
            disabled={ disabled }
            onClick={ onClick } >
            { children }
        </button>
    )
}

export default PnPButton
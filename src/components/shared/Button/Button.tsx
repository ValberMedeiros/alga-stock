import React from 'react'
import './Button.css'

declare interface ButtonProps {
    content: string
}

const Button:React.FC<{ content: any }> = (props) => {
    return <button className="AppButton">
        { props.content }
    </button>
}

export default Button
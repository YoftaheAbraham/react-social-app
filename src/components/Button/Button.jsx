const Button = ({ text, type, padding, color, clickHandler }) => {
    return (
        <div><button onClick={clickHandler} style={{
            cursor: 'pointer',
            padding: `${padding}rem 1rem`,
            borderRadius: ".5rem",
            background: type == "primary" ? "rgb(177, 14, 142)" : "transparent",
            color: color ? color : "#fff",
            border: type == "primary" ? "none" : "1px solid rgb(148, 148, 148)"
        }} className={type}>{text}</button></div>
    )
}

export default Button
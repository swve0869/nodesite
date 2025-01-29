import './Button.css';

function Button({handleClick,buttonmsg}){
    return(
        <button onClick={handleClick}>{buttonmsg}</button>
    )
} export default Button;
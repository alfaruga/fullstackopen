const Input = (props)=>{
    return(
        <div>
        {props.name}: <input value={props.value} onChange={props.handlerFunction}></input>
        </div>
    )
}
export default Input
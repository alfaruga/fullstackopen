import './Notification.css'

const Notification = (props)=>{
var styles = !props.error? "message": "message errorStyle"
    return props.message===null? props.message: <div className={styles}>{props.message}</div>
}

export default Notification
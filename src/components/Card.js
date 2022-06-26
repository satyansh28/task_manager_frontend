import styles from './Card.module.css';
const Card=(props)=>{
    const task=props.task;
    task.createdAt=new Date(task.createdAt);
    task.createdAt=task.createdAt.toLocaleString().replace(" ","");
    return(<div key={task._id} className={styles.outer+" "+(task.completed?styles.green:styles.white)}>
        <h4 className={styles.date}>{task.createdAt}</h4>
        <p className={styles.desc}>{task.description+" "}</p>
        {!task.completed?<button onClick={()=>props.onDone(task._id)} className={styles.done}><i className="fa fa-check"></i> Mark done</button>:""}
        <button className={styles.del} onClick={()=>props.onDelete(task._id)}><i className="fa fa-trash"></i> Delete</button>
        
    </div>)
}
export default Card;
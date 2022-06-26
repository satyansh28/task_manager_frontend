import { useRef,useContext } from 'react';
import dom from'react-dom';
import logincontext from '../store/logincontext';
import styles from './overlay.module.css';
const destination=document.getElementById("overlay");
const backend='http://localhost:5000'
const Overlay=(props)=>{
    const {loginstate}=useContext(logincontext);
    const textref=useRef(null);
    const addtask=async()=>{
        try{
            await fetch(backend+'/addtask',{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({token:loginstate.token,task:{
                    description:textref.current.value
                }})
            })
            props.close(false);
        }
        catch(e){
            alert('An error occured,please try again later!');
        }
    }
    return(<>
    <div className={styles.backdrop} onClick={()=>props.close(false)}></div>
    <div className={styles.formin}>
        <p>Task:</p>
        <textarea ref={textref} rows='8'></textarea>
        <button onClick={()=>addtask()}>Add</button>
    </div>
    </>)
}
const final_add=(props)=>{
    return(<>{dom.createPortal(<Overlay {...props}/>,destination)}</>)
}

export default final_add;
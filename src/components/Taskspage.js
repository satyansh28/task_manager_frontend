import Card from './Card.js';
import styles from './Taskpage.module.css';
import logincontext from '../store/logincontext.js';
import { useContext,useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Addoverlay from './Add_overlay.js';
const backend=process.env.REACT_APP_BACKEND_HOST;
const frontend_part="";
const Taskspage=(props)=>{
    const{loginstate,setloginstate}=useContext(logincontext);
    const[refreshlist,setrefresflist]=useState(false);
    const[page,setpage]=useState(1);
    const[tasks,settasks]=useState(undefined);
    const[onAdd,setonAdd]=useState(false);
    const deltask=async(taskid)=>{
        try{
            await fetch(backend+'/deletetask',{
                method:"DELETE",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({token:loginstate.token,taskid:taskid})
            })
            setrefresflist((prev)=>!prev);
        }
        catch(e){
            alert('An error occured,please try again later!');
        }
    }
    const markdone=async(taskid)=>{
        try{
            await fetch(backend+'/updatetask',{
                method:"PATCH",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({token:loginstate.token,taskid:taskid})
            })
            setrefresflist((prev)=>!prev);
        }
        catch(e){
            alert('An error occured,please try again later!');
        }
    }
    const onLogout=()=>{
        const token=loginstate.token;
        localStorage.removeItem('token');
        setloginstate({});
        try{
            fetch(backend+"/logoutuser",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({token:token})
            });
        }
        catch(e){
            console.log(e);
        }
        
    }
    useEffect(()=>{
        const token=loginstate.token;
        if(!token || onAdd)
            return;
        fetch(backend+"/usertasks?page="+page,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({token:token})
        }).then((res)=>{
            if(res.status===200)
                return(res.json())
            else
            {
                
                throw new Error("server down");
            }
        }).then(res =>{
            settasks(res?res:[])
        }).catch(e=>{
            settasks([]);
            alert("An error occured,please try again later!");
        });
       
    },[refreshlist,loginstate,onAdd,page]);
    if(loginstate.token)
        return(<>
        {onAdd?<Addoverlay close={setonAdd}/>:""}
        <div className={styles.tasklist}>
        <div className={styles.heading}>
            <button className={styles.add} onClick={()=>setonAdd(true)}>Add +</button>
            <p >TASK-LIST</p>
            <button onClick={()=>onLogout()} className={styles.logout}><i className="fa fa-power-off"></i> Logout</button>
        </div>
        {
            tasks!==undefined?<ul>{tasks.map((task)=><li key={task._id}><Card onDone={markdone} onDelete={deltask} task={task}/></li>)}</ul>:<h2>Loading...</h2>
        }
        {(tasks && tasks.length>0) || page!==1? 
            <div className={styles.pagecontrol}>
                <button onClick={()=>setpage((prev)=>{return(prev-1>0?prev-1:0)})} className={styles.pagebut} disabled={page!==1?false:true}>{'<<'}</button>
                <p className={styles.pagenum}>{page}</p>  
                <button onClick={()=>setpage((prev)=>prev+1)} className={styles.pagebut} disabled={tasks.length>=10?false:true}>{'>>'}</button>          
            </div>
        :"" }
        </div>
        
        </>);
    else
        return(<Redirect to={`${frontend_part}/login`}/>)
};
export default Taskspage;
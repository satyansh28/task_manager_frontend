import styles from "./Loginpage.module.css";
import { NavLink,useHistory } from "react-router-dom";
import { useEffect,useContext,useRef } from "react";
import logincontext from "../store/logincontext";
const backend=process.env.REACT_APP_BACKEND_HOST;
const frontend_part="";
const Loginpage=(props)=>{
    const emailref=useRef(null);
    const pwdref=useRef(null);
    const hist=useHistory();
    const {loginstate,setloginstate}=useContext(logincontext);
    const onLogin=(event)=>{
        const inputs={
            email:emailref.current.value,
            password:pwdref.current.value,
        }
        if(inputs.email.length===0 || !inputs.email.includes('@'))
        {
            alert('Invalid email');
            emailref.current.value="";
        }
        else if (inputs.password.length<8)
            alert('Password must be atleast 8 characters long');
        else
        {
            fetch(backend+"/loginuser",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(inputs)
            }).then((res)=>
            {
                if(res.status===200)
                    return(res.json());
                else if(res.status===400)
                    throw new Error("Invalid email or password");
                else
                    throw new Error("Something went wrong,try again later!");
            }
            )
            .then((res)=>{
                setloginstate({token:res.token});
                localStorage.setItem('token',res.token);
            })
            .catch((e)=>{
                alert(e)
            });
        }
        pwdref.current.value="";
    }
    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token!==null)
            setloginstate({token:token});
    },[setloginstate])
    useEffect(()=>{
        if(loginstate.token && loginstate.token!==null)
            hist.push(`${frontend_part}/notes`);
    },[loginstate,hist])
    return(
    <div className={styles.outer}>
        <p className={styles.headings}>Sign in</p>
        <label htmlFor="email">Email:</label>
        <input ref={emailref}  className={styles.input} type="email" name="emailid"></input>
        <label htmlFor="password">Password:</label>
        <input ref={pwdref}  className={styles.input} type="password" name="pwd"></input>
        <button className={styles.button} onClick={onLogin}>Login</button>
        <NavLink to={`${frontend_part}/register`}>Register</NavLink>
    </div>
    );

}
export default Loginpage;
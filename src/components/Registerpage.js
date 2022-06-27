import styles from "./Loginpage.module.css";
import { NavLink,useHistory } from "react-router-dom";
import { useRef } from "react";
const backend=process.env.REACT_APP_BACKEND_HOST;
const frontend_part=process.env.REACT_APP_FRONTEND_HOST_PART;
const Regpage=(props)=>{
    
    const hist=useHistory();
    const nameref=useRef(null);
    const emailref=useRef(null);
    const pwdref=useRef(null);
    const onReg=(event)=>{
        const inputs={
            name: nameref.current.value
            ,email:emailref.current.value
            ,password:pwdref.current.value};
        if(inputs.name.length===0)
            alert('Name cannnot be empty.');
        else if(inputs.email.length===0 || !inputs.email.includes('@'))
            alert('Invalid email.');
        else if (inputs.password.length<8)
            alert('Password must be atleast 8 characters long.');
        else
        {
            
            fetch(backend+"/adduser",{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(inputs)
            }).then((res)=>
            {
                if(res.status===201)
                {
                    hist.replace(`${frontend_part}/login`);
                    alert('An email has been sent to you,please verify then login!');
                }
                else if(res.status===401)
                    throw new Error("Duplicate email");
                else
                    throw new Error("Something went wrong,try again later!");
            } )
            .catch((e)=>{
                console.log(e);
                alert(e);
            });
            
        }
    }
    return(
    <div className={styles.outer}>
        <p className={styles.headings}>Register</p>
        <label htmlFor="name">Name:</label>
        <input ref={nameref} className={styles.input} type="text" name="name"></input>
        <label htmlFor="email">Email:</label>
        <input ref={emailref} className={styles.input} type="email" name="emailid"></input>
        <label htmlFor="password">Password:</label>
        <input ref={pwdref} className={styles.input} type="password" name="pwd"></input>
        <button className={styles.button} onClick={onReg}>Register</button>
        <NavLink to={`${frontend_part}/login`}>Sign in</NavLink>
    </div>
    );

}
export default Regpage;
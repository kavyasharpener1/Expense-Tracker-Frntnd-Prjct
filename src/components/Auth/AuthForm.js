import { useState, useRef, useContext } from 'react';

import classes from './authform.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {

  const history = useHistory()


  const authCtx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLoading,setIsLoading] = useState(false)

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value


    setIsLoading(true)


    if(isLogin){

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyClLO8O-QV5g0EAt-jqKtJSk00fNvc-4fM',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'content-type':"application/json"
        }
      })
      .then(async (res) => {
        setIsLoading(false)
        if(res.ok){
          return res.json();
        }else{
          let errorMessage = 'Authentication failed';
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, enteredEmail)
        alert('Login successfully')

        history.replace('/')
      })      
      .catch((err) => {
        alert(err.message)
      })


    }
    else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClLO8O-QV5g0EAt-jqKtJSk00fNvc-4fM',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'content-type':"application/json"
        }
      })
      .then(async (res) => {
        setIsLoading(false)
        if(res.ok){
          return res.json();
        }else{
          let errorMessage = 'Authentication failed';
          throw new Error(errorMessage);
        }
      })
      .then(() => {
        alert('Account created successfully')
      })      
      .catch((err) => {
        alert(err.message)
      })


    }
  }
    


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.btn}>
        {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {isLoading && <p>Sending request...</p>}
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
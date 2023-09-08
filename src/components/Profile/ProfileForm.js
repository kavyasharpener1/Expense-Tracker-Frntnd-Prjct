import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/Auth-Context'
import { useHistory } from 'react-router-dom';


const ProfileForm = () => {

  const history = useHistory()



  const authCtx = useContext(AuthContext)

  const newPasswordInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyClLO8O-QV5g0EAt-jqKtJSk00fNvc-4fM',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'content-type':"application/json"
      }
    }).then((res) => {
      alert('Password changed successfully')
      history.replace('/')

    })

  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
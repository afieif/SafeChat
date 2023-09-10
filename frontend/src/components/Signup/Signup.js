import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { createUser, googleAuth } from '../../firebase';
import { OutlinedInput, InputAdornment, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
    const [email,setEmail] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();

    useEffect(() => {
        console.log(user)
        if(user){
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    

  return (
    <div className='login-body'>
    <div className='login-card'>
        <div className='login-text-field'>
            <TextField label="Email" type={'email'} variant="outlined" fullWidth 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div className='login-text-field'>
            <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
                id='password'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility"
                    onClick={()=>setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Confirm Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            </FormControl>
        </div>
        <div className='login-text-field'>
            <FormControl variant='outlined' fullWidth>
            <InputLabel htmlFor="confirm">Confirm Password</InputLabel>
            <OutlinedInput
                id='confirm'
                type={showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility"
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                error={password!==confirmPassword}
            />
            {password!==confirmPassword?
            <FormHelperText id="confirm">Passwords do not match</FormHelperText>:<></>}
            </FormControl>
        </div>
        <div className='login-button'>
            <Button variant="contained" size="large" fullWidth 
            onClick={()=>createUser(email,password)}
            disabled={password!==confirmPassword}>Sign up</Button>
        </div>
        <div className='login-to-signup'>
            Already have an account? 
            <Link to={'/login'}>
                <span className='login-blue'>Login</span>
            </Link>
        </div>
        <div className='login-divider'>
            - OR -
        </div>
        <div className='google login-button'>
            <Button variant="outlined" size="large" onClick={()=>googleAuth()}><GoogleIcon/></Button>
        </div>
    </div>
</div>
  )
}
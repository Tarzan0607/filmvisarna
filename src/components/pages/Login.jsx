import '../../css/style-login.css';
import {
    post,
    del
} from '../../utilities/backend-talk';
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

export default function Admin() {
    const [authentication, setAuthentication] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['name']);
    
    function handleAuthChange(event) {
        setAuthentication(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        if (!authentication) return Swal.fire({ title: 'Inmatningsfel', text: 'Email eller användarnamn måste användas', icon: 'error', confirmButtonText: 'Bekräfta' });
        if (!password) return Swal.fire({ title: 'Inmatningsfel', text: 'Lösenord måste användas', icon: 'error', confirmButtonText: 'Bekräfta' });

        const res = await post('/api/user/login', {auth: authentication, password: password});

        if (res.response === 'already logged in') return Swal.fire({title: 'Redan inloggad', text: 'Du är redan inloggad', icon: 'error', confirmButtonText: 'Bekräfta'})

        if (res.response === 'invalid auth') return Swal.fire({ title: 'Inloggningen misslyckades', text: 'Användarnamn / Email kunde inte hittas', icon: 'error', confirmButtonText: 'Bekräfta' });

        if (res.response === 'invalid password') return Swal.fire({ title: 'Inloggningen misslyckades', text: 'Lösenordet är inte korrekt', icon: 'error', confirmButtonText: 'Bekräfta' });

        localStorage.setItem('jwtToken', res.token);
        localStorage.setItem('user', res.user);
        localStorage.setItem('admin', res.isAdmin);
        if (res.response === 'logged in') return Swal.fire({ title: 'Inloggningen lyckades', text: 'Du är nu inloggad, välkommen!!', icon: 'success', confirmButtonText: 'Bekräfta' }).then(() => window.location.href = '/');
    }

    useEffect(() => {
        if (localStorage.user) return window.location.href = '/';
    }, []);

  return <div className='login-bokningar'>
    <h1>Login</h1>
    <div className="input-login">
        <input className="login-box center-block" placeholder="Username / Email" onInput={handleAuthChange} />
        <input className="login-box center-block" placeholder="Password" onInput={handlePasswordChange} />
        <button className="login-button center-block" onClick={handleLogin}>Login</button>
    </div>
  </div>
}
import '../../css/style-login.css';
import {
    del,
    post
} from '../../utilities/backend-talk';
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

export default function Admin() {
    const [cookies, setCookie] = useCookies(['name']);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (!localStorage.user) return window.location.href = '/';
    }, []);

    async function handleLogout() {
        if (!localStorage.user) return Swal.fire({ title: 'Inte inloggad', text: 'Du är inte inloggad, logga in först', icon: 'error', confirmButtonText: 'Bekräfta' });
        const res = await del('/api/user/login');

        if (res.response === 'Not logged in!') return Swal.fire({ title: 'Inte inloggad', text: 'Du är inte inloggad just nu', icon: 'error', confirmButtonText: 'Bekräfta' });

        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
		localStorage.removeItem('admin');
        if (res.response === 'logged out') return Swal.fire({ title: 'Utloggad', text: 'Du är nu utloggad', icon: 'success', confirmButtonText: 'Bekräfta' }).then(() => window.location.href = '/');
    }

    function handleUserID(event) {
        setUserId(event.target.value);
    }

    async function handleResetToken() {
        if (!userId) return Swal.fire({ title: 'Inget användarID hittat', text: 'Du måste använda ett korrekt användarID', icon: 'error', confirmButtonText: 'Bekräfta' });

        const res = await post(`/api/user/token-refresh`, {userid: userId, admin: !localStorage.admin ? false : true});
        console.log(res)

        if (res.response === 'invalid user id') return Swal.fire({ title: 'användarID är inte korrekt', text: 'Ingen användare med insatt ID har funnits', icon: 'error', confirmButtonText: 'Bekräfta' });

        if (res.message === 'success') return Swal.fire({ title: 'API Token ändrat', text: 'API Token har ändrats för användarID:et', icon: 'success', confirmButtonText: 'Bekräfta' });
    }

  return <div className='login-bokningar'>
    <h1 className='login-title'>Your Profile: {localStorage.user}</h1>
    <div className="input-login">
        <label>Your API Token:</label>
        <input className="login-box center-block" disabled={true} value={localStorage.jwtToken} />
        {
            localStorage.admin === '1' ? <h2>Admin Panel</h2> : null
        }
        {
            localStorage.admin === '1' ? <input className="login-box center-block" placeholder='User ID' onInput={handleUserID}/> : null
        }
        {
            localStorage.admin === '1' ? <button className="login-button center-block" onClick={handleResetToken}>Reset API Token</button> : null
        }
        {
            localStorage.admin === '1' ? <br /> : null
        }
        <button className="login-button center-block" onClick={handleLogout}>Logout</button>
    </div>
  </div>
}
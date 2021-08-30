import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../actions';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // const logout = (e) => {
    //     dispatch(signout());
    // }

    useEffect(() => {
        dispatch(signout());
    }, [dispatch])

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <div>
            Good Bye!!!
        </div>
    )
}

export default Login

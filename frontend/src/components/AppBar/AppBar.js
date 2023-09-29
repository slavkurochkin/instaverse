import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Image, Typography, Button, Avatar } from "antd";
import Logo from "../../images/instavers.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from 'jwt-decode';


import styles from './styles';
// import { fetchStoriesByTag } from '../../actions/stories';

const { Title } = Typography;
const { Header } = Layout;
// const { Search } = Input;

export default function AppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate("/authform"); // redirect to login page
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);


//    const [collapsed, setCollapsed] = useState(false);
/**
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const input = Input.Search;

    const onSearch = (inputValue) => {
        dispatch(fetchStoriesByTag(inputValue));
        //reset();
    };
*/
    return (
        <Header style={styles.header}>
            <Link to="/">
                <div style={styles.homeLink}>
                    <Image  style={styles.image} preview={false} src={Logo} width={45} />
                    &nbsp;
                    <Title  style={styles.title}>instaverse</Title>
                </div>
            </Link>
            {!user ? (
                <Link to="/authform">
                    <Button htmlType='button' size='large' style={styles.login}>
                        Log In
                    </Button>
                </Link>
            ): (
                <div style={styles.userInfo}>
                    <Avatar style={styles.avatar} alt="username" size="large">
                        {user?.result?.username?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Title style={styles.title} level={4}>
                        {user?.result?.username}
                    </Title>
                    <Button onClick={logout} htmlType='button' size='large' style={styles.button}>
                        Log Out
                    </Button>
                </div>
            )}
        </Header>
    )
}
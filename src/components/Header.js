import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUserName, selectUserphoto } from "../features/user/userSlice";
import { setUserLogin, setSignOut } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";
const Nav = styled.div`
  height: 70px;
  background: #09031b;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &::after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      }
    }
    &:hover {
      span:after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }
`;
const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: all 250ms ease-in;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserphoto);
  const history = useHistory();

  //Another way so that on refresh user does not logout ,we user LocalStorage method in this app
  //but firebase remember user in cache so it can call it from there
  // useEffect(() => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       dispatch(
  //         setUserLogin({
  //           name: result.user.displayName,
  //           email: result.user.email,
  //           photo: result.user.photoURL,
  //         })
  //       );
  //       history.push("/");
  //     }
  //   });
  // });

  const SignIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      dispatch(
        setUserLogin({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        })
      );
      history.push("/");
    });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      localStorage.removeItem("user");
      history.push("/login");
    });
  };
  return (
    <Nav>
      <Logo src='/images/logo.svg' />
      {!userName ? (
        <LoginContainer>
          <Login onClick={SignIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src='/images/home-icon.svg' />
              <span>HOME</span>
            </a>
            <a>
              <img src='/images/search-icon.svg' />
              <span>SEARCH</span>
            </a>
            <a>
              <img src='/images/watchlist-icon.svg' />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src='/images/original-icon.svg' />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src='/images/movie-icon.svg' />
              <span>MOVIES</span>
            </a>
            <a>
              <img src='/images/series-icon.svg' />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg src={userPhoto} onClick={signOut} />
        </>
      )}
    </Nav>
  );
};

export default Header;

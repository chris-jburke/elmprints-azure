import React, { MouseEvent, useState, useEffect } from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import {Button, InputBase} from '@material-ui/core'
import Search from '@material-ui/icons/Search'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import Tree from './img/treeTrial.png'
import {Decoded} from './App'
import {Redirect, Link} from 'react-router-dom'
import SearchBarCom from './SearchBarCom'

const useStyles = makeStyles(theme => ({
    // search: {
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: 'white',
    //     '&:hover': {
    //       backgroundColor: fade(theme.palette.common.white, 1),
    //     },
    //     marginRight: theme.spacing(2),
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //       marginLeft: theme.spacing(3),
    //       width: 'auto',
    //     }
    // },
    // searchIcon: {
    //     width: theme.spacing(7),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // inputRoot: {
    //     color: 'inherit',
    // },
    // inputInput: {
    //     padding: theme.spacing(1, 1, 1, 7),
    //     transition: theme.transitions.create('width'),
    //     width: '100%',
    //     [theme.breakpoints.up('md')]: {
    //       width: 200,
    //     }
    // },
    buttonRoot: {
      borderRadius: 3,
      background: 'rgba(228, 225, 225, .80)',
      '&:hover': {
        background: 'rgba(228, 225, 225, .90)',
      },
      color: 'black',
      border: '2px solid black',
      height: 36,
      width: 95
    }
}));
export interface HeaderProps {
    user: Decoded | null,
    updateUser: (newToken: string | null) => void,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<HeaderProps> =(props) => {
    const [redirect, setRedirect] = useState<boolean>(false)
    const classes = useStyles()
    
    const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        localStorage.removeItem('mernToken')
        props.updateUser(null)
    }

    const handleSearchTermChange = (value:string):any => {
        props.setSearchTerm(value)
        setRedirect(true)
    }

    let variableButton = (
        <div className="loginBtn">
            <Link to="/login" className="loginLink">Sign In</Link>        
        </div>
    )
    if(props.user) {
        variableButton = (
            <Button classes={{root: classes.buttonRoot}} className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" 
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleLogout(e)}>Sign out</Button>
        )
    }

    if (redirect) {
        return <Redirect to="/search" />
    }
    return(
        <div className="headerDiv">
            <div className="brandingDiv">
                <img className="brandingIcon" src={Tree} alt="Tree Icon"></img>
                <div className="brandingName">
                    <h1>ELM</h1>
                    <h1>PRINTS</h1>
                </div>
            </div>
            <div className="headerSuperMain">
                <div className="headerMain">
                    <header className="mdc-top-app-bar primary">
                        <div className="mdc-top-app-bar__row">
                            <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start header-top">
                                <SearchBarCom onChange={handleSearchTermChange} />
                                
                                {variableButton}
                                <Button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                                    <ShoppingCart stroke={"black"} stroke-width={1} style={{color: "rgba(255, 255, 255, .90)"}} />
                                </Button>
                                <Link to="/profile">
                                    <AccountCircleOutlined stroke={"black"} stroke-width={0.5} style={{color: "rgba(255, 255, 255, .90)"}} fontSize="large" />
                                </Link>
                            </section>
                        </div>
                    </header>
                    <nav>
                        <Link to="/posters">Posters</Link>
                        <Link to="/art">Art</Link>
                        <Link to="/faq">FAQ</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Header
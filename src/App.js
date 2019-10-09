import React, { useState, useEffect } from 'react'
import './App.css';
import CartList from './components/CartList';
import ProviderList from './components/ProviderList'
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Fade, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CartsIcon from '@material-ui/icons/Commute';
import ProvidersIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import ListItemLink from './components/ListItemLink'
import PublicHomePage from './components/PublicHomePage'
// import LocalizedStrings from 'react-localization';


const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    easing: theme.transitions.easing.sharp,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function Home() {
  return (
    <div>
      Home
  </div>
  )
}

function Carts() {
  return (
    <CartList></CartList>
  )
}

function Providers() {
  return (
    <ProviderList></ProviderList>
  )
}

const MainViewPort = () => {

  const [loggedIn, setLoggedIn] = React.useState(true)

  return (
    <div>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/providers" /> : <PublicHomePage />}
      </Route>
      <Route path="/carts">
        <Carts />
      </Route>
      <Route path="/providers">
        <Providers />
      </Route>
    </div>
  );
}

export default withRouter(function App({ props, location }) {
  // export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [navBarTitle, setNavBarTitle] = React.useState('no title')
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const mainViews = [
  'Providers',
  'Carts']

  const secondaryViews = ['Settings']

  useEffect(() => {

    const { pathname } = location;
    console.log('New path:', pathname);
    let routeName = pathname.replace('/', '')
    document.title = routeName
    setNavBarTitle(routeName)

    return () => {
      //cleanup
    }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getIconComponent = (text) => {
    switch (text) {
      case 'Home':
        return <HomeIcon />
      case 'Providers':
        return <ProvidersIcon />
      case 'Carts':
        return <CartsIcon />
      case '-':
        return <Divider />
      case 'Settings':
        return <SettingsIcon />
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography id="nav-bar-title" variant="h6" noWrap>
            {navBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {mainViews
            .map((text, index) => (
              <ListItemLink
                key={text}
                to={`/${text}`}
                primary={text}
                icon={getIconComponent(text)}
              />
            ))}
        </List>
        <Divider />
        <List>
          {secondaryViews
            .map((text, index) => (
              <ListItemLink
                key={text}
                to={`/${text}`}
                primary={text}
                icon={getIconComponent(text)} />
            ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          <MainViewPort />
      </main>
    </div>
  );
})
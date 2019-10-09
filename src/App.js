import React, { useState, useEffect } from 'react'
import './App.css';
import CartList from './components/CartList';
import ProviderList from './components/ProviderList'
import { BrowserRouter as Router, Route, withRouter, Redirect } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Fade, List } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CartsIcon from '@material-ui/icons/Commute';
import ProvidersIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import ListItemLink from './components/ListItemLink'
import PublicHomePage from './components/PublicHomePage'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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

  const classes = useStyles();

  // swipable drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
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
    </div>
  );

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
      setNavBarTitle(null)
    }
  }, [location.pathname, navBarTitle]);

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
    <div>
      <CssBaseline />
      <AppBar
        position="sticky"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
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
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
        <main>
          <MainViewPort />
        </main>
    </div>
  );
})
import React, {
  useState,
  useEffect
} from 'react'
import './App.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
// import firebaseConfig from './firebaseConfig';
import {
  withRouter,
} from "react-router-dom";

import clsx from 'clsx';
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import {
  // Fade, 
  List,
  SwipeableDrawer,
  IconButton,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Commute as CartsIcon,
  Home as HomeIcon,
  SupervisedUserCircle as ProvidersIcon,
  SettingsApplications as SettingsIcon
} from '@material-ui/icons'
import MainView from './components/MainView'
import ListItemLink from './components/ListItemLink'
import LinearIndeterminateProgress from './components/LinearIndeterminateProgress'
// import strings from './Strings'
import FirebaseDataProvider from './Helpers/DataProviders/FirebaseDataProvider'
// import strings from 'react-localization';

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



const firebaseApp = FirebaseDataProvider.firebaseInitialized

export default withRouter(function App({ props, location, hideLoader }) {

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [navBarTitle, setNavBarTitle] = React.useState('no title')
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [drawerSelection, setDrawerSelection] = useState(null)

  const [showProgress, setShowProgress] = useState(false);

  const mainViews = [
    'Providers',
    'Carts']

  const secondaryViews = ['Settings']

  // swipable drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    const { pathname } = location;
    console.log('New path:', pathname);
    let routeName = pathname.replace('/', '')
    document.title = routeName
    setNavBarTitle(routeName)
    return () => {
      //cleanup
      // setNavBarTitle(null)
    }
  }, [location.pathname]);

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleListItemOnCLick = (event) => {
    console.log('selected drawer item: ' + event.target.textContent)
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List
        onClick={handleListItemOnCLick}
      >
        {mainViews
          .map((text, index) => (
            <ListItemLink
              key={text}
              to={`/${text}`}
              primary={text}
              icon={getIconComponent(text)}
              id={text}
            >
            </ListItemLink>
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
      {showProgress && <LinearIndeterminateProgress />}
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
      <main>
        <MainView />
      </main>
    </div>
  );
})
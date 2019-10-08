import React, { useState, useEffect } from 'react'
import './App.css';
import CartList from './components/CartList';
import ProviderList from './components/ProviderList'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LocalizedStrings from 'react-localization';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CartsIcon from '@material-ui/icons/Commute';
import ProvidersIcon from '@material-ui/icons/SupervisedUserCircle';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import ListItemLink from './components/ListItemLink'

function Home() {
  return (
    <div>
      Home
  </div>
  )
}

function Carts() {
  return (
    <div>
      <CartList></CartList>
    </div>
  )
}

function Providers() {
  return (
    <div>
      <ProviderList></ProviderList>
    </div>
  )
}

const AppViewPort = () => {

  const views = [CartList, ProviderList]

  // [presentedView, setPresentedView] = useState(CartList)
  // var selectedView = [ProviderList]

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/carts">
          <Carts />
        </Route>
        <Route path="/providers">
          <Providers />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
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

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerItemSelection = (selection) => {
    switch (selection) {
      case 'providers':

        break;

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
            {props.title ? props.title : "no title yet"}
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
        <Router>
          <Switch>
            <List>
              {['Home', 'Providers', 'Carts'].map((text, index) => (
                <Route path={`/${text}`}>
                  <ListItem button key={text}>
                    <ListItemIcon>{
                      (() => {
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
                      })()
                    }</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Route>
              ))}
            </List>
          </Switch>
        </Router>
        <Divider />
        <List>
          {['Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{
                (() => {
                  switch (text) {
                    case 'Settings':
                      return <SettingsIcon />
                    default:
                      break;
                  }
                })()
              }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <AppViewPort />
      </main>
    </div>
  );
}
import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

export default function NavBar(props) {

    const {} = props;

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="subtitle1" color="inherit">
                        Carts Viewer
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class NavigationBar extends Component {

    constructor(props) {
        super(props)
    }

    logout = () => {
        console.log(localStorage.getItem('authToken'));
        localStorage.clear();
        console.log(localStorage.getItem('authToken'));
    }

    render() {
        const { classes } = this.props;
        let header = (localStorage.getItem('authToken') == null) ? (
            <div>
                Login
            </div>
        ) : (
            <div>
                <Grid container direction={'row'}>
                    {/*<Grid item>*/}
                    {/*    {localStorage.getItem('authToken')}*/}
                    {/*</Grid>*/}
                    <Grid item>
                        <Button
                            color={"inherit"}
                            // onClick={this.logout}
                        >
                            Log Out
                        </Button>

                    </Grid>
                </Grid>
            </div>
        )
        return(
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Recruiter
                    </Typography>
                        {/*<Button color="inherit">Login</Button>*/}
                        {header}
                </Toolbar>
            </AppBar>
        )
    }
}


NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
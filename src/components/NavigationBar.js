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
import history from '../util/history'
import {NavItem} from "react-bootstrap";

const url = "http://localhost:8080/"

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
        this.state = {
            user: null,
            validUser: false,
        }
    }

    getProfile = () => {
        const self = this;
        let status;
        fetch(url + "api/currentuser", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
        console.log(response.status)
        status = response.status;
        self.state.validUser = (response.status === 200);
        if(response.status === 200) {
            return response.json();
        }
        else
            return response;
        })
        .then(myJson => {
            if(self.state.validUser) {
                console.log(myJson);
                self.setState({ user : myJson});
                console.log(this.state);
                return myJson;
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });

    }

    async componentDidMount() {
        await this.getProfile()
    }



    render() {
        const { classes } = this.props;
        // console.log(this.state);
        let login = (!this.state.validUser) ? (

                <div>
                    login
                </div>

        ) : (
            <Fragment>
                    <Button>
                        Profile
                    </Button>

            </Fragment>
        )
        return(
            <AppBar position="static">
                <Toolbar>
                    <Button>Search Jobs</Button>
                    <Button>Post A Job</Button>
                    <Typography variant="h6" className={classes.title}>
                        Recruiter
                    </Typography>
                        {/*<Button color="inherit">Login</Button>*/}
                        {login}
                </Toolbar>
            </AppBar>
        )
    }
}


NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
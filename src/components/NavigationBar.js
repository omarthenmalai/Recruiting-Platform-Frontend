import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core";

const url = "http://localhost:3000"
const api = "http://localhost:8080"

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    feature: {
        marginLeft: theme.spacing(2),
    },
});

class NavigationBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            validUser: false,
            loading: true,
        }
    }

    getProfile = () => {
        const self = this;
        let status;
        fetch( api + "/api/currentuser", {
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

    handleLogout() {
        fetch(api + '/logout', {
            method: 'POST',
            mode: 'no-cors',
            credentials: "include",
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });
        window.location.href = url + '/login'

    }


    render() {
        const { classes } = this.props;
        // console.log(this.state);
        let login = (!this.state.validUser) ? (
            <Fragment>
                <Button className={classes.button} href={url + '/login'}>
                    Login
                </Button>
                <Button className={classes.button} href={url + '/register'}>
                    Register
                </Button>
            </Fragment>

        ) : (
            <Fragment>
                    <Button className={classes.button} href={url + '/profile'}>
                        Profile
                    </Button>
                    <Button className={classes.button} onClick={this.handleLogout}>
                        Sign Out
                    </Button>

            </Fragment>
        )

        let features;
        if(this.state.user == null) {
            features = <div></div>
        } else {
            features = (this.state.user != null && this.state.user.accountType == "Company") ? (
                <div>
                    <Button href={url + "/post-job"}>
                        Post a Job
                    </Button>
                </div>
            ) : (
                <Button href={url + "/jobs"}>
                    Search Jobs
                </Button>
            )
        }

        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="h6">
                            Fake Linkedin
                        </Typography>
                        <div className={classes.feature}>
                            {features}
                        </div>
                        <div>
                            {login}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


NavigationBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBar);
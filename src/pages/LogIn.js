import React from 'react';
import { Form, Button } from "react-bootstrap";
import {email, required} from '../util/validation';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            redirect: false,
            email: "",
            password: "",
            validUser: "",
            response: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    validate = values => {
        const errors = required(['email', 'password'], values, this.props);

        if (!errors.email) {
            const emailError = email(values.email, values, this.props);
            if (emailError) {
                errors.email = email(values.email, values, this.props);
            }
        }
        return errors;
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    async handleSubmit(e) {
        // e.preventDefault();
        var self = this;
        console.log(this.state);
        // axios.post(url + '/login/users', {
        //     email: this.state.email,
        //     password: this.state.password,
        // })
        const endpoint = url + '/users/login?email=' + this.state.email + "&password=" + this.state.password;
        await axios.post(endpoint)
        .then(response => {
            console.log(response);
            self.setState({ validUser: (response.status === 200), sent: true, response: response.data});
            if(response.status === 200) {
                self.setState({redirect: true});
                console.log(this.state);
                // localStorage.setItem('authToken', this.state.email);
                this.props.history.push('/profile');
            }
        })
        .catch(error => {
            self.setState({ validUser: (error.status === 200), sent: true, response: error.response.data});
            console.log(error.response);
        })
    }


    render() {
        const { classes } = this.props;
        const { sent } = this.state;
        let text = (this.state.sent) ? (
            <div>
                {this.state.response}
            </div>
        ) : (
            <div>
                {this.state.response}
            </div>
        )

        // if (this.state.redirect)
        //     this.props.history.push('/profile');
        //     // return <Redirect push to="/profile"/>;
        return(
            <div className={classes.root}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                    <Grid container spacing={3} xs={6} justify={"center"} direction={"column"}>
                        <Grid item>
                            {text}
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="Email"
                                name={'email'}
                                onChange={this.handleChange}
                                className={classes.paper}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-basic"
                                label="Password"
                                name={'password'}
                                // type={'password'}
                                onChange={this.handleChange}
                                className={classes.paper}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" className={classes.paper} color="primary" type={'submit'} onClick={this.handleSubmit} disableElevation={true}>
                                Sign In
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </div>
        );
    };
}

LogIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LogIn);


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
        let formData = new FormData();
        console.log(this.state.email);
        formData.append('username', self.state.email,);
        formData.append('password', self.state.password,);
        console.log(this.state);
        fetch(url+'/login', {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            body: formData,
        })
        .then(opaqueRes => {
            fetch(url+'/api/currentuser', {
                method: "GET",
                mode: "cors",
                credentials: "include",
            })
            .then(response => {
                console.log(response.json())
                if(response.status==200)
                    this.props.history.push('/profile')
            })
            .catch(error => {
                console.log(error)
            });
        })
        .catch(error => {
            console.log(formData);
            // self.setState({ validUser: (error.status === 200), sent: true, response: error.response.data});
            console.log(error);
        });


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


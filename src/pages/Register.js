import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        margin: theme.spacing(1),
        flexGrow: 1,
    },
    textfield: {
        minWidth: 235,
    },
    dropdown: {
        minWidth: 235,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    jobs: {

    },
    button: {
        minWidth: 235,
    }
});


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            redirect: false,
            username: null,
            email: null,
            password: null,
            passwordConfirm: null,
            accountType: null,
            validUser: "",
            response: "",
            error: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    isInvalidEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(email))
            return false;
        else
            return true;


    }

    validate = () => {
        var error = false;
        if(this.state.username == null || this.state.username.length < 6 || this.state.username.length > 32) {
            error = true
            this.setState({error: "Username must be between 6 and 32 characters long"})
        } else if(this.state.email == null || this.isInvalidEmail(this.state.email)) {
            error = true;
            this.setState({error: "Invalid email"})
        } else if(this.state.accountType == null) {
            error = true;
            this.setState({error: "Select an Account Type"})
        } else if(this.state.password.length < 8) {
            error = true;
            this.setState({error: "Password must be at least 8 characters long"})
        } else if(this.state.password != this.state.passwordConfirm) {
            error = true;
            this.setState({error: "Passwords don't match"})
        }
        return error;
    }

    async handleSubmit(e) {
        var self = this;
        var err = this.validate();
        if(err)
            return;
        let formData = new FormData();
        formData.append('email', self.state.email,);
        formData.append('password', self.state.password,);
        formData.append('passwordConfirm', self.state.passwordConfirm,);
        formData.append('username', self.state.username,);
        formData.append('accountType', self.state.accountType,);
        console.log(this.state);
        fetch(url+'/registration', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: formData,
        })
        .then(opaqueRes => {
            console.log(opaqueRes)
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
        return(
                <Grid className={classes.root}container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                    <Grid item spacing={0}>
                        <h1 align={'center'}>
                            Register
                        </h1>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            name={'username'}
                            onChange={this.handleChange}
                            value={this.state.username}
                            variant={'outlined'}
                            className={classes.textfield}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            onChange={this.handleChange}
                            name={'email'}
                            variant={"outlined"}
                            value={this.state.email}
                            className={classes.textfield}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>
                            Account Type
                        </InputLabel>
                        <Select
                            labelId="exp-label"
                            id="exp-select"
                            value={this.state.accountType}
                            name="accountType"
                            className={classes.dropdown}
                            inputProps={{ 'aria-label': 'accountType' }}
                            onChange={this.handleChange}
                            variant={'outlined'}
                            required={true}
                        >
                            <MenuItem value={"Applicant"}>Applicant</MenuItem>
                            <MenuItem value={"Company"}>Company</MenuItem>
                        </Select>
                    </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-basic"
                                label="Password"
                                onChange={this.handleChange}
                                name={'password'}
                                variant={"outlined"}
                                type={"password"}
                                value={this.state.password}
                                className={classes.textfield}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-basic"
                                label="Confirm Your Password"
                                onChange={this.handleChange}
                                name={'passwordConfirm'}
                                variant={"outlined"}
                                type={"password"}
                                value={this.state.passwordConfirm}
                                className={classes.textfield}
                                required={true}
                            />
                        </Grid>
                    <Grid item xs={4} alignItems={'center'}>
                        <Button className={classes.button} variant="contained" color="primary" type={'submit'} onClick={this.handleSubmit}>
                            Register
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.error}
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
        );
    };
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);


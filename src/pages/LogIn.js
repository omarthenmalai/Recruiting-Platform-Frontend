import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1)
    },
});


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            redirect: false,
            username: "",
            password: "",
            validUser: "",
            response: "",
            error: " ",
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    async handleSubmit(e) {
        // e.preventDefault();
        var self = this;
        let formData = new FormData();
        console.log(this.state.username);
        formData.append('username', self.state.username,);
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
                if(response.status==200) {
                    window.location.href = "http://localhost:3000/profile";
                }

            })
            .catch(error => {
                console.log(error);
                self.setState({error: "Invalid Username and Password"});
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

        return(
            <Grid className={classes.root}container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                <Grid item spacing={0}>
                    <h1 align={'center'}>
                        Login
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
                        label="Password"
                        onChange={this.handleChange}
                        name={'password'}
                        variant={"outlined"}
                        value={this.state.password}
                        className={classes.textfield}
                        required={true}
                    />
                </Grid>
                <Grid item xs={4}>
                    {this.state.error}
                </Grid>

                <Grid item xs={4}>
                    <Button className={classes.button} variant="contained" color="primary" type={'submit'} onClick={this.handleSubmit}>
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant={"h6"}>
                        Dont have an account? <a href={"http://localhost:3000/register"}>Sign Up</a>
                    </Typography>

                </Grid>
            </Grid>

        );
    };
}

LogIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LogIn);


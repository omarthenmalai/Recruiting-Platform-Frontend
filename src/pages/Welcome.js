import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {Select, withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Redirect from "react-router-dom/es/Redirect";
import Jobs from "./Jobs";
import {Route} from "react-router-dom";
import qs from 'query-string'
import Box from "@material-ui/core/Box";

const url = "http://localhost:8080"

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

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            location: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSubmit = values => {
        const query = qs.stringify(this.state);
        this.props.history.push({
            pathname: '/jobs',
            search: query,
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                >
                <Grid container spacing={3} xs={6} justify={"center"} direction={"column"}>
                    <Grid item>
                        <TextField
                            id="standard-basic"
                            label="Position"
                            name={'title'}
                            onChange={this.handleChange}
                            className={classes.paper}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-basic"
                            label="Location"
                            onChange={this.handleChange}
                            name={'location'}
                            className={classes.paper}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" className={classes.paper} color="primary" type={'submit'} onClick={this.handleSubmit} disableElevation={true}>
                            Search Jobs
                        </Button>
                    </Grid>
                </Grid>
                </Box>
            </div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);
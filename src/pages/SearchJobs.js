import React from 'react';
import {Select, withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import JobCard from "../components/JobCard";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Form from "react-bootstrap/Form";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import JobSearchForm from "../components/JobSearchForm";
import qs from "query-string";
import axios from "axios";

const url = "http://localhost:8080"

const styles = (theme) => ({
    root: {
        minWidth: 275,
        marginTop: 50,
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

class SearchJobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            title: null,
            location: null,
            experienceLevel: null,
            salary: null,

        };

    };


    handleSubmit = () => {
        var that = this;
        var first = true;
        var params = {
            title: this.state.title,
            salary: this.state.salary,
            location: this.state.location,
            experienceLevel: this.state.experienceLevel,
        }
        var endpoint = "http://localhost:8080/api/jobs?";
        for(const key in params) {
            if(params[key] != null){
                if(first)
                    endpoint = endpoint + key + "=" + params[key];
                else
                    endpoint = endpoint + "&" + key + "=" + params[key];
            }
        }
        console.log(endpoint);
        fetch(endpoint, {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',

        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            that.setState({ data: data, loading: false });
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    salaryText(value) {
        const salary = value*2.5;
        return '${salary}+';
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };



    render() {
        const { classes } = this.props;
        let jobs = !this.state.loading ? ((this.state.data && this.state.data.length) ? (
            this.state.data.map(job => <JobCard classes={classes} info={job} type={'applicant'}/>)
        ) : <h2>No Matches Found That Meet Your Criteria</h2>) : (
            <p>Loading...</p>
        );

        const salaries = [
            {
                value: 0,
                label: '0+',
            },
            {
                value: 20,
                label: '50,000+',
            },
            {
                value: 50,
                label: '125,000+',
            },
            {
                value: 100,
                label: '250,000+',
            },
        ];

        return (
            <Grid container>
                <Grid item xs={4}>
                    <Grid className={classes.root}container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                        <Grid item spacing={0}>
                            <h1 align={'center'}>
                                Search For Jobs
                            </h1>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-basic"
                                label="Position"
                                name={'title'}
                                onChange={this.handleChange}
                                defaultValue={this.state.title}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="standard-basic"
                                label="Location"
                                onChange={this.handleChange}
                                name={'location'}
                                variant={"outlined"}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Salary
                            </InputLabel>
                            <Select
                                labelId="exp-label"
                                id="exp-select"
                                value={this.state.salary}
                                name="salary"
                                displayEmpty
                                className={classes.dropdown}
                                inputProps={{ 'aria-label': 'experienceLevel' }}
                                onChange={this.handleChange}
                                variant={'outlined'}
                            >
                                <MenuItem value={50000}>50,000{"+"}</MenuItem>
                                <MenuItem value={100000}>100,000{"+"}</MenuItem>
                                <MenuItem value={150000}>150,000{"+"}</MenuItem>
                                <MenuItem value={200000}>200,000{"+"}</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                Experience Level
                            </InputLabel>
                            <Select
                                labelId="exp-label"
                                id="exp-select"
                                value={this.state.experienceLevel}
                                name="experienceLevel"
                                displayEmpty
                                className={classes.dropdown}
                                inputProps={{ 'aria-label': 'experienceLevel' }}
                                onChange={this.handleChange}
                                variant={'outlined'}
                            >
                                <MenuItem value={0}>Entry Level</MenuItem>
                                <MenuItem value={1}>{"<"}1 Year</MenuItem>
                                <MenuItem value={3}>{"<"}3 Years</MenuItem>
                                <MenuItem value={5}>{"<"}5 Years</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={4} alignItems={'center'}>
                            <Button className={classes.button} variant="contained" color="primary" type={'submit'} onClick={this.handleSubmit}>
                                Search Jobs
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} className={classes.root}>
                    {jobs}
                </Grid>
            </Grid>

         );
     }
}

SearchJobs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchJobs);
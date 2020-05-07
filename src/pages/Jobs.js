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

class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            title: "",
            location: "",
            experienceLevel: 0,
            company: "",
            pressed: false,

        };

    };

    fillSearchBoxes = () => {
        const values = qs.parse(this.props.location.search);
        if(typeof this.state.title != 'undefined')
            this.state.title = values.title;
        if(typeof this.state.company != 'undefined')
            this.state.company = values.company;
        if(typeof this.state.location != 'undefined')
            this.state.location = values.location;
        if(typeof this.state.experienceLevel != 'undefined')
            this.state.experienceLevel = values.experienceLevel;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.pressed != this.state.pressed)
            console.log('refresh')
    }


    componentDidMount = async () => {
        // this.fillSearchBoxes();
        console.log(this.props.location.search);
        const response = await fetch(url + '/jobs/getOpenJobs' + this.props.location.search);
        const data = await response.json();
        this.setState({data : data, loading: false});
        console.log(data);
    };

    salaryText(value) {
        const salary = value*2.5;
        return '${salary}+';
    }
e
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSubmit = values => {
        const query =("?title=" + this.state.title +
            "&location=" + this.state.location +
            // "&experienceLevel=" + this.state.experienceLevel +
            "&company=" + this.state.company
        );
        this.setState({pressed:true});

        this.props.history.push({
            pathname: '/jobs',
            search: query,
        });
        window.location.reload(false);
    }


    render() {
        const { classes } = this.props;
        let jobs = !this.state.loading ? ((this.state.data && this.state.data.length) ? (
            this.state.data.map(job => <JobCard classes={classes} info={job}/>)
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
                            <TextField
                                id="standard-basic"
                                label="Company"
                                name={'company'}
                                onChange={this.handleChange}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
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

Jobs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Jobs);
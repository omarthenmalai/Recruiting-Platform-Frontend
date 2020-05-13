import React from 'react';
import {Select, withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ApplicantJobCard from "../components/ApplicantJobCard";

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
            minsalary: null,
            validUser: false,
            user: null,

        };

    };


    handleSubmit = () => {
        var that = this;
        var first = true;
        var params = {
            title: this.state.title,
            minsalary: this.state.minsalary,
            location: this.state.location,
            experienceLevel: this.state.experienceLevel,
        }
        var endpoint = "http://localhost:8080/api/jobs?";
        for(const key in params) {
            if(params[key] != null && params[key] != ""){
                if(first) {
                    endpoint = endpoint + key + "=" + params[key];
                    first = false;
                }
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            data: null,
        })
    };

    async componentDidMount() {
        await this.getProfile();
    }

    getProfile = () => {
        const self = this;
        fetch(url + "/api/currentuser", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
            console.log(response);
            this.state.validUser = (response.status === 200);
            if(response.status === 200) {
                return response.json();
            }
            else
                return response;
        })
        .then(myJson => {
            if(this.state.validUser) {
                console.log(myJson);
                this.setState({ loading: false, user : myJson});
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            window.location.href = "http://localhost:3000/login";

        });

    }

    render() {
        const { classes } = this.props;
        let jobs = !this.state.loading ? ((this.state.data && this.state.data.length) ? (
            this.state.data.map(job => <ApplicantJobCard classes={classes} info={job} user={this.state.user}/>)
        ) : <h2>No Matches Found That Meet Your Criteria</h2>) : (
            <p>Loading...</p>
        );


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
                                value={this.state.title}
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
                                value={this.state.location}
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
                                value={this.state.minsalary}
                                name="minsalary"
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
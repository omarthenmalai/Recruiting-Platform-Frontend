import React from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

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

class AddJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
            title: null,
            location: null,
            experienceLevel: 0,
            description: null,
            salary: 0,
            validUser: false,
            user: null,

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = () => {
        var that = this;
        const endpoint = url + '/api/jobs?title='
            + this.state.title
            + '&location=' + this.state.location
            + '&experienceLevel=' + this.state.experienceLevel
            + '&salary=' + this.state.salary
            + '&description=' + this.state.description
        console.log(endpoint);
        fetch(endpoint, {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {
            console.log(data)
            that.setState({ response: data});
        })
        .catch(error => {
            console.log(error);
        });
    };

    getProfile = () => {
        const self = this;
        fetch(url + "api/currentuser", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        }).then(response => {
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
            });

    }

    async componentDidMount() {
        await this.getProfile();
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Grid container className={styles.root} spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                    <Grid item spacing={0}>
                        <h1 align={'center'}>
                            Post A Job
                        </h1>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Position"
                            name={'title'}
                            value={this.state.title}
                            onChange={this.handleChange}
                            variant={'outlined'}
                            className={styles.textfield}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Location"
                            name={'location'}
                            variant={"outlined"}
                            value={this.state.location}
                            onChange={this.handleChange}
                            className={styles.textfield}
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
                            className={styles.dropdown}
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
                            name="experienceLevel"
                            displayEmpty
                            className={styles.dropdown}
                            value={this.state.experienceLevel}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'experienceLevel' }}
                            variant={'outlined'}
                        >
                            <MenuItem value={0}>Entry Level</MenuItem>
                            <MenuItem value={1}>{"<"}1 Year</MenuItem>
                            <MenuItem value={3}>{"<"}3 Years</MenuItem>
                            <MenuItem value={5}>{"<"}5 Years</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>
                            Description
                        </InputLabel>
                        <textarea
                            value={this.state.description}
                            onChange={this.handleChange}
                            name={'description'}
                        >
                        </textarea>
                    </Grid>
                    <Grid item xs={4} alignItems={'center'}>
                        <Button className={styles.button} variant="contained" color="primary" type={'submit'} onClick={this.handleSubmit}>
                            Post
                        </Button>
                    </Grid>
                    {this.state.response}
                </Grid>
            </div>

            );
    };

}

AddJob.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default AddJob;
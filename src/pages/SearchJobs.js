import React from 'react';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { Select } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import NavigationBar from "../components/NavigationBar";
import Form from "react-bootstrap/Form";
import Grid from "@material-ui/core/Grid";


const url = "http://localhost:8080";



class SearchJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sent: false,
            redirect: false,
            incorrect: false,
            title: "",
            experienceLevel: 0,
            location: "",
            salary: 0,
            company: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        axios.get(url + "/jobs/getOpenJobs", {
            title: this.state.title,
            experienceLevel: this.state.experienceLevel,
            location: this.state.location,
            salary: this.state.salary,
            company: this.state.company
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Grid container spacing={6}>
                <Form onSubmit={this.handleSubmit}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <FormControl noValidate autoComplete={"off"}>
                        <TextField
                            id="standard-basic"
                            label="Position"
                            onChange={this.handleChange}
                            name={'title'}
                        />
                        <br/>
                        <TextField
                            id="standard-basic"
                            label="Company"
                            onChange={this.handleChange}
                            name={'company'}
                        />
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <Select
                            labelId="salary-label"
                            id="salary-select"
                            value={this.state.salary}
                            name={'salary'}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={0}>
                                <em>Salary</em>
                            </MenuItem>
                            <MenuItem value={50000}>50,000+</MenuItem>
                            <MenuItem value={60000}>60,000+</MenuItem>
                            <MenuItem value={80000}>80,000+</MenuItem>
                            <MenuItem value={100000}>100,000+</MenuItem>
                            <MenuItem value={1500000}>150,000+</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <TextField
                            id="standard-basic"
                            label="Location"
                            name={'location'}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <Select
                            labelId="exp-label"
                            id="exp-select"
                            value={this.state.experienceLevel}
                            name="experienceLevel"
                            inputProps={{ 'aria-label': 'experienceLevel' }}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={0}>Entry Level</MenuItem>
                            <MenuItem value={60000}>{"<"}1 Year</MenuItem>
                            <MenuItem value={80000}>{"<"}3 Years</MenuItem>
                            <MenuItem value={100000}>{"<"}5 Years</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                    <br/>
                    <FormControl>
                        <Button variant="contained" color="primary" type={'submit'}>
                            Search Jobs
                        </Button>
                    </FormControl>
                </Form>
            </Grid>
        )
    }
}

export default SearchJobs;
import React from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import {Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import qs from "query-string";
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";

const classes = (theme) => ({
    root: {
        minWidth: 275,
        marginTop: 100,
    },
    dropdown: {
        minWidth: 220,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class JobSearchForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            title: "",
            location: "",
            experienceLevel: 0,
            company: "",
            salary: 0,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    handleSubmit = values => {
        console.log(this.state);
        const query = qs.stringify(this.state);
        this.props.history.push({
            pathname: '/jobs',
            search: query,
        });
    }

    render() {
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

        return(
            <Grid className={classes.root}container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                <Grid item xs={4}>
                    <TextField
                        id="standard-basic"
                        label="Position"
                        name={'title'}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="standard-basic"
                        label="Location"
                        onChange={this.handleChange}
                        name={'location'}
                    />
                </Grid>
                {/*<Grid item xs={2} alignContent={"center"} >*/}
                {/*    <Typography id="discrete-slider-always" gutterBottom align={"left"}>*/}
                {/*        Salary*/}
                {/*    </Typography>*/}
                {/*    <Slider*/}
                {/*        defaultValue={20}*/}
                {/*        aria-labelledby="discrete-slider-always"*/}
                {/*        getAriaValueText={this.salaryText}*/}
                {/*        step={10}*/}
                {/*        marks={salaries}*/}
                {/*        onChange={this.handleChange}*/}
                {/*        value={"salary"}*/}
                {/*        name={"salary"}*/}

                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={4}>
                    <TextField
                        id="standard-basic"
                        label="Company"
                        name={'company'}
                        onChange={this.handleChange}
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
                    >
                        <MenuItem value={0}>Entry Level</MenuItem>
                        <MenuItem value={1}>{"<"}1 Year</MenuItem>
                        <MenuItem value={3}>{"<"}3 Years</MenuItem>
                        <MenuItem value={5}>{"<"}5 Years</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" type={'submit'} onClick={this.handleSubmit}>
                        Search Jobs
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

JobSearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(classes)(JobSearchForm)
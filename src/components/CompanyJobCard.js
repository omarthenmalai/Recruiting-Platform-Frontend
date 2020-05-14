import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Card, Select} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Divider } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        minWidth: 275,
    },
    mycard: {
        height: 200,
        width: 800,
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
    description: {
        align: 'left',
    },
});

class CompanyJobCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apply: false,
            editing: false,
            info: null,
            selectedFile: null,
            title: this.props.info.title,
            location: this.props.info.location,
            experienceLevel: this.props.info.experienceLevel,
            salary: this.props.info.salary,
            id: this.props.info.id,
            description: this.props.info.description,
            show: true,
            uploaded: false,
        };
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    deleteJob = () => {
        var that = this;
        fetch(url + '/api/jobs/delete?title=' + this.state.title, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        })
        .then(function(response) {
        return response;
        })
        .catch(error => {
            console.log(error);
        });
        this.setState({ show: false})
    };

    saveChanges = () => {
        var that = this;
        console.log(that.state);
        var endpoint =  "http://localhost:8080/api/jobs/edit?" +
            "salary=" + this.state.salary +
            "&title=" + this.state.title +
            "&experienceLevel=" + this.state.experienceLevel +
            "&location=" + this.state.location +
            "&id=" + this.state.id +
            "&description=" + this.state.description;
        fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        that.setState({editing: false});
    };



    render() {
        const {classes, info: {id, title, salary, experienceLevel, location, description}, type, user} = this.props;
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        console.log(formatter.format(1000));
        let card;
        if(this.state.show) {
            card = (!this.state.editing) ? (
                <Card className={classes.mycard} variant={"outlined"}>
                    <Grid container direction={"row"} spacing={1}>
                        <Grid item xs={4}>
                            <CardContent>
                                <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary"
                                            gutterBottom>
                                    {this.state.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {this.state.location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {this.state.experienceLevel} Years Experience Required
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {formatter.format(this.state.salary)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={() => {this.setState({editing:true})}}>
                                    Edit
                                </Button>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={this.deleteJob}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Grid>
                        <Divider orientation={"vertical"} flexItem/>
                        <Grid item xs={6}>
                            <Typography variant={'p'}>
                                {this.state.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Title"
                            name={'title'}
                            onChange={this.handleChange}
                            value={this.state.title}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard-basic"
                            label="Location"
                            name={'location'}
                            onChange={this.handleChange}
                            value={this.state.location}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                    <Grid item xs={12}>
                        <textarea className={classes.textfield} name={'description'} value={this.state.description} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" variant={'outlined'} color={'primary'} onClick={this.saveChanges}>
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            )
        }
                {/*// <Grid container direction={"column"} spacing={1}>*/}
                {/*//     <Grid item xs={2}>*/}
                {/*//         <TextField*/}
                {/*//             id="standard-basic"*/}
                {/*//             label="Title"*/}
                {/*//             name={'title'}*/}
                {/*//             onChange={this.handleChange}*/}
                {/*//             value={this.state.title}*/}
                {/*//             variant={'outlined'}*/}
                {/*//             className={classes.textfield}*/}
                {/*//         />*/}
                {/*//     </Grid>*/}
                {/*//     <Grid item xs={2}>*/}
                {/*//         <TextField*/}
                {/*//             id="standard-basic"*/}
                {/*//             label="Location"*/}
                {/*//             name={'location'}*/}
                {/*//             onChange={this.handleChange}*/}
                {/*//             value={this.state.location}*/}
                {/*//             variant={'outlined'}*/}
                {/*//             className={classes.textfield}*/}
                {/*//         />*/}
                {/*//     </Grid>*/}
                {/*//     <Grid item xs={4}>*/}
                {/*//         <InputLabel shrink id="demo-simple-select-placeholder-label-label">*/}
                {/*//             Salary*/}
                {/*//         </InputLabel>*/}
                {/*//         <Select*/}
                {/*//             labelId="exp-label"*/}
                {/*//             id="exp-select"*/}
                {/*//             value={this.state.salary}*/}
                {/*//             name="salary"*/}
                {/*//             displayEmpty*/}
                {/*//             className={classes.dropdown}*/}
                {/*//             inputProps={{ 'aria-label': 'experienceLevel' }}*/}
                {/*//             onChange={this.handleChange}*/}
                {/*//             variant={'outlined'}*/}
                {/*//         >*/}
                {/*//             <MenuItem value={50000}>50,000{"+"}</MenuItem>*/}
                {/*//             <MenuItem value={100000}>100,000{"+"}</MenuItem>*/}
                {/*//             <MenuItem value={150000}>150,000{"+"}</MenuItem>*/}
                {/*//             <MenuItem value={200000}>200,000{"+"}</MenuItem>*/}
                {/*//         </Select>*/}
                {/*//     </Grid>*/}
                {/*//     <Grid item xs={4}>*/}
                {/*//         <InputLabel shrink id="demo-simple-select-placeholder-label-label">*/}
                {/*//             Experience Level*/}
                {/*//         </InputLabel>*/}
                {/*//         <Select*/}
                {/*//             labelId="exp-label"*/}
                {/*//             id="exp-select"*/}
                {/*//             value={this.state.experienceLevel}*/}
                {/*//             name="experienceLevel"*/}
                {/*//             displayEmpty*/}
                {/*//             className={classes.dropdown}*/}
                {/*//             inputProps={{ 'aria-label': 'experienceLevel' }}*/}
                {/*//             onChange={this.handleChange}*/}
                {/*//             variant={'outlined'}*/}
                {/*//         >*/}
                {/*//             <MenuItem value={0}>Entry Level</MenuItem>*/}
                {/*//             <MenuItem value={1}>{"<"}1 Year</MenuItem>*/}
                {/*//             <MenuItem value={3}>{"<"}3 Years</MenuItem>*/}
                {/*//             <MenuItem value={5}>{"<"}5 Years</MenuItem>*/}
                {/*//         </Select>*/}
                {/*//     </Grid>*/}
                {/*//     <Grid item xs={2}>*/}
                {/*//         <textarea name={'description'} value={this.state.description} onChange={this.handleChange}/>*/}
                {/*//     </Grid>*/}
                {/*//     <Grid item xs={2}>*/}
                {/*//         <Button size="small" variant={'outlined'} color={'primary'} onClick={this.saveChanges}>*/}
                {/*//             Save Changes*/}
                {/*//         </Button>*/}
                {/*//     </Grid>*/}
                {/*// </Grid>*/}



        return (
            <div>
                {card}
            </div>
        )
    }
}



export default withStyles(styles)(CompanyJobCard)
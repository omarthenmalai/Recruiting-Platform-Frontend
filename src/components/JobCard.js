import React, {Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Card} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Divider } from '@material-ui/core';
import axios from "axios";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

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
});

class JobCard extends React.Component {
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
        this.onFileChange = this.onFileChange.bind(this);
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.value);
    };

    openApply = () => {
        this.setState({apply: true, jobId: this.props.info.jobId});
    }

    closeApply = () => {
        this.setState({apply: false});
    }

    onFileChange(event) {
            this.setState({ selectedFile: event.target.files[0] });
            console.log(event.target.files[0]);
    }

    onFileUpload = () => {

        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
        );
        fetch(url + '/api/applications?jobid=' + this.state.id, {
            method: "POST",
            mode: 'no-cors',
            credentials: 'include',
            body: formData,
        })
        .then(response => {
            if(response.status == 200) {
                console.log('uploaded')
                this.setState({uploaded: true})
            } else {


            }
        })
        .catch(error => {
            console.log(error)
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        axios.post(url + '/applications/createApplicationPosting', {
            userId: 1,
            jobId: this.props.info.jobId,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

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
        const {classes, info: {id, title, company, experienceLevel, location, description}, type} = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        let card;
        if(type == "applicant") {
            card = !this.state.apply ? (
                <Card className={classes.mycard} variant={"outlined"}>
                    <Grid container direction={"row"} spacing={0} justify={"left"}>
                        <Grid xs={4}>
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
                                    {this.state.salary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={this.openApply}>
                                    Apply
                                </Button>
                            </CardActions>
                        </Grid>
                        <Divider orientation={"vertical"} flexItem/>
                        <Grid item xs={3}>
                            {description}
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Card className={classes.mycard} variant={"outlined"}>
                    <Grid container direction={"row"} spacing={0} justify={"left"}>
                        <Grid xs={4}>
                            <CardContent>
                                <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary"
                                            gutterBottom>
                                    {title}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {company}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {location}
                                </Typography>
                            </CardContent>

                        </Grid>
                        <Divider orientation={"vertical"} flexItem/>
                        <Grid container direction={'column'} xs={4} justify={'center'} alignItems={'center'}>
                            <Grid item xs={4}>
                                <CardActions>
                                    <input type="file" className={styles.button} onChange={this.onFileChange}/>
                                </CardActions>
                            </Grid>
                            <Grid item xs={4}>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={this.onFileUpload}>
                                    Upload
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <CardActions>
                                    <Button size="small" variant={'outlined'} color={'primary'}
                                            onClick={this.closeApply}>
                                        Cancel
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            );
        } else if(type=='company' && this.state.show) {
            card = (!this.state.editing) ? (
                <Card className={classes.mycard} variant={"outlined"}>
                    <Grid container direction={"row"} spacing={0} justify={"left"}>
                        <Grid xs={4}>
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
                                    {this.state.salary}
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
                        <Grid item xs={3}>
                            {this.state.description}
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Grid container direction={"row"} spacing={1} justify={"left"}>
                    <Grid xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Title"
                            name={'title'}
                            onChange={this.handleChange}
                            value={this.state.title}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                        <TextField
                            id="standard-basic"
                            label="Location"
                            name={'location'}
                            onChange={this.handleChange}
                            value={this.state.location}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                        <TextField
                            id="standard-basic"
                            label="Experience Level"
                            name={'experienceLevel'}
                            onChange={this.handleChange}
                            value={this.state.experienceLevel}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                        <TextField
                            id="standard-basic"
                            label="Salary"
                            name={'salary'}
                            onChange={this.handleChange}
                            value={this.state.salary}
                            variant={'outlined'}
                            className={classes.textfield}
                        />
                        <Button size="small" variant={'outlined'} color={'primary'} onClick={this.saveChanges}>
                            Save Changes
                        </Button>

                    </Grid>
                    <Grid item xs={3}>
                        <textarea name={'description'} value={this.state.description} onChange={this.handleChange}/>
                    </Grid>
                </Grid>
            )
        }

        return (
            <div>
                {card}
            </div>
        )
    }
}



export default withStyles(styles)(JobCard)
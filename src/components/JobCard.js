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

const url = "http://localhost:3000";

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
            jobId: 0,
            apply: false,
            info: null,
            selectedFile: null,
        };
    };


    openApply = () => {
        this.setState({apply: true, jobId: this.props.info.jobId});
    }

    closeApply = () => {
        this.setState({apply: false});
    }

    onFileChange(event) {
            this.setState({ selectedFile: event.target.files[0] });
    }

    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
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

    render(){
        const { classes, info : {jobId, title, company, experienceLevel, location, description}} = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        let card = !this.state.apply ? (
            <Card className={classes.mycard} variant={"outlined"}>
                <Grid container direction={"row"} spacing={0} justify={"left"}>
                    <Grid xs={4}>
                        <CardContent>
                            <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {company}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {location}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {experienceLevel} Years Experience Required
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
                            <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary" gutterBottom>
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
                                <input type="file" className={styles.button} onChange={this.onFileChange} />
                            </CardActions>
                        </Grid>
                        <Grid item xs={4}>
                            <Button size="small" variant={'outlined'} color={'primary'} onClick={this.closeApply}>
                                Upload
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <CardActions>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={this.closeApply}>
                                    Cancel
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        );

        return (
            <div>
                {card}
            </div>
        )
    }
}



export default withStyles(styles)(JobCard)
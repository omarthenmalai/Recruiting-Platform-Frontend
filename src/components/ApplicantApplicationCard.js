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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class ApplicantApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apply: false,
            app: null,
        };
    };


    render(){
        const { classes, app : {jobId, title, company, experienceLevel, location, description, applicationStatus}} = this.props;
        return (
            <Card className={classes.root}>
                <Grid container direction={"row"}>
                    <Grid xs={6}>
                        <CardContent>
                            <Typography variant="h5" component="h2" color="textPrimary" gutterBottom>
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
                    </Grid>
                    <Grid xs={6}>
                        STATUS: {applicationStatus}
                    </Grid>
                </Grid>
            </Card>
        )
    }
}



export default withStyles(styles)(ApplicantApplicationCard)
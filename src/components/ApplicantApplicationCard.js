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
import CompanyProfile from "./CompanyProfile";

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        minWidth: 275,
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
            user: this.props.user,
            app: this.props.app,
            job: null,
            show: true,
        };

    };

    getJob = () => {
        var self = this;
        console.log(url + '/api/jobs/' + this.props.app.jobId);
        fetch(url + '/api/jobs/' + this.props.app.jobId, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
        .then(response => {
            if(response.status == 200) {
                return response.json();
            }
            return response;
        })
        .then(json => {
            self.setState({job: json})
        })
        .catch(error => {
            console.log(error);
        })
    }

    async componentDidMount() {
        await this.getJob();
    }

    deleteApplication = () => {
        var self = this;
        console.log(url + '/api/applications/delete?id=' + this.props.app.id);
        fetch(url + '/api/applications/delete?id=' + this.props.app.id, {
            method: "POST",
            mode: "cors",
            credentials: "include",
        })
        .catch(error => {
            console.log(error);
        })
        this.setState({show: false})
    }


    render(){
        const { classes, app, user } = this.props;
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        let card;
        if(this.state.job == null) {
            card = (<div>Loading...</div>)
        }
        else if(this.state.show) {
            card = (
                <div>
                    <Card className={classes.mycard} variant={"outlined"}>
                        <CardContent>
                            <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary"
                                        gutterBottom>
                                {this.state.job.title}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {this.state.job.location}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {this.state.job.experienceLevel} Years Experience Required
                            </Typography>
                            <Typography variant="body2" component="p">
                                {formatter.format(this.state.job.salary)}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Status: {this.state.app.applicationStatus}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant={'outlined'} color={'primary'}
                                    onClick={this.deleteApplication}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            )
        } else {
            card = <div></div>
        }




        return (
            <div>
                {card}
            </div>

        )
    }
}

ApplicantApplicationCard.propTypes = {
    app: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

};


export default withStyles(styles)(ApplicantApplicationCard)
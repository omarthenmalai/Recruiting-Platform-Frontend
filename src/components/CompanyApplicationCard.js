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
import Application from "./Application";

const url = "http://localhost:8080";

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

class CompanyApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            apps: null,
            job: this.props.job,
            showApps: false,
        };

    };

    getApplications = () => {
        var self = this;
        // console.log(url + '/api/applications?jobid=' + this.props.job.id);
        fetch(url + '/api/applications?jobid=' + this.props.job.id, {
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
                console.log(json)
                self.setState({apps: json})
            })
            .catch(error => {
                console.log(error);
            })
    }

    async componentDidMount() {
        await this.getApplications();
    }

    viewApplication = () => {
        var self = this;
        console.log(url + '/api/file?id=' + this.props.app.id);
        fetch(url + '/api/file?id=' + this.props.app.id, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .catch(error => {
                console.log(error);
            })
    }


    render(){
        const { classes, job, user } = this.props;
        console.log(job);
        let apps;
        if(this.state.apps == null) {
            apps = (
                <div>
                    Loading...
                </div>
            )
        } else if (this.state.apps.length == 0 && this.state.showApps) {
            apps = (
                <div>
                    No Applications
                </div>
            )
        } else if(this.state.showApps) {
            apps = this.state.apps.map(app => <Application app={app}/>);
        } else {
            apps = (<div></div>);
        }

        let buttontext = (!this.state.showApps)  ? (
            <Button
                size="small"
                variant={'outlined'}
                color={'primary'}
                onClick={() => {this.setState({showApps:true});}}
            >
                View Applications
            </Button>
        ) : (
            <Button
                size="small"
                variant={'outlined'}
                color={'primary'}
                onClick={() => {this.setState({showApps:false});}}
            >
                Hide Applications
            </Button>
        )


        let card;
        if(this.state.apps == null) {
            card = (<div>Loading...</div>)
        } else {
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
                        </CardContent>
                        <CardActions>
                            {buttontext}
                        </CardActions>
                    </Card>
                    <div>
                        {apps}
                    </div>
                </div>
            )
        }


        return (
            <div>
                {card}
            </div>

        )
    }
}

CompanyApplicationCard.propTypes = {
    job: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

};


export default withStyles(styles)(CompanyApplicationCard)
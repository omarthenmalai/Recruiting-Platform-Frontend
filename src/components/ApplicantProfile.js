import React from 'react'
import PropTypes from "prop-types";
import UserInfo from "./UserInfo";
import ApplicantApplicationCard from "./ApplicantApplicationCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import JobCard from "./CompanyJobCard";
import CompanyProfile from "./CompanyProfile";
import Typography from "@material-ui/core/Typography";


class ApplicantProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            loading: true,
            applications: null,
            showInfo: true,
            showApps: false,
        }
    }

    getApplications = () => {
        var that = this;
        fetch("http://localhost:8080/api/applications?userid=" + this.state.user.id , {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',

        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            that.setState({ applications: data, loading: false });
        })
        .catch(error => {
            console.log(error);
        });
    }

    async componentDidMount() {
        this.getApplications();
    }

    render() {
        const {classes, user} = this.props;
        let div;
        if(this.state.showInfo) {
            div = (<UserInfo classes={classes} info={user}/>);
        }
        else if(this.state.showApps) {
            if(this.state.applications === null || this.state.applications.length === 0) {
                div = (
                    <div>
                    <Typography variant="h2">
                        No Applications
                    </Typography>
                    <Typography variant={"p"}>
                        <a href={"http://localhost:3000/jobs"}>
                            Search for a job and apply
                        </a>
                    </Typography>
                </div>
                )
            } else {
                div = (this.state.applications.map(app => <ApplicantApplicationCard classes={classes} user={user} app={app}/>));
            }
        }
        else {
            div = (<div>Loading...</div>);
        }
        return (
            <div>
                <Button
                    onClick={() => {
                        this.setState({
                            showInfo: true,
                            showApps:false,
                        });
                    }
                    }>
                    User Information
                </Button>
                <Button
                    onClick={() => {
                        this.setState({
                            showInfo: false,
                            showApps:true,
                        });
                    }
                    }>
                    Applications
                </Button>
                <Grid container justify={'center'}>
                    <Grid item xs={12}>
                        {div}
                    </Grid>
                </Grid>
            </div>
        )
    }

}

ApplicantProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

};

export default ApplicantProfile;
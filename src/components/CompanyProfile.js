import React from 'react'
import PropTypes from "prop-types";
import UserInfo from "./UserInfo";
import ApplicantApplicationCard from "./ApplicantApplicationCard";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import JobCard from "./CompanyJobCard";
import CompanyApplicationCard from "./CompanyApplicationCard";

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
    button: {
        minWidth: 235,
    }
});

class CompanyProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            loading: true,
            applications: null,
            jobs: null,
            showInfo: true,
            showApps: false,
            showJobs: false,
        }
    }

    getJobs = () => {
        var that = this;
        fetch("http://localhost:8080/api/jobs?companyid=" + this.state.user.id , {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',

        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                that.setState({ jobs: data, loading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }



    getApplications = () => {
        var that = this;
        fetch("http://localhost:8080/api/applications?jobid=" + this.state.user.id , {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',

        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                that.setState({ jobs: data, loading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    async componentDidMount() {
        await this.getJobs();
    }



    render() {
        const { user } = this.props;
        console.log(this.state);
        let div;
        if(this.state.showInfo) {
            div = (<UserInfo classes={styles} info={user}/>);
        }
        else if(this.state.showApps) {
            div = (
                this.state.jobs.map(job => <CompanyApplicationCard classes={styles} job={job} user={user}/>)
            );
        }
        else if(this.state.showJobs) {
            div = (
                this.state.jobs.map(job => <JobCard classes={styles} info={job} type={"company"} user={user}/>)
            )
        }

        return(
            <div>
                <Button
                    onClick={() => {
                        this.setState({
                            showInfo: true,
                            showApps:false,
                            showJobs: false,
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
                            showJobs: false,
                        });
                    }
                    }>
                    Applications
                </Button>
                <Button
                    onClick={() => {
                        this.setState({
                            showInfo: false,
                            showApps:false,
                            showJobs: true,
                        });
                    }
                    }>
                    jobs
                </Button>
                <Grid container justify={'center'}>
                    <Grid item xs={12}>
                        {div}
                    </Grid>

                </Grid>
            </div>
        )
    };

}

CompanyProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

};

export default CompanyProfile;


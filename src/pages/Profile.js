import React from 'react'
import axios from "axios"
import JobCard from "../components/JobCard";
import ApplicantApplicationCard from "../components/ApplicantApplicationCard";
import Grid from "@material-ui/core/Grid";
import UserInfo from "../components/UserInfo";
import withStyles from "@material-ui/core/styles/withStyles";

const url = "http://localhost:8080/"

const styles = (theme) => ({
    root: {
        minWidth: 275,
        marginTop: 20,
        flexGrow: 1,
    },
    textfield: {
        minWidth: 230,
    },
    dropdown: {
        minWidth: 200,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    jobs: {

    },
    button: {
        minWidth: 230,
    }

});


class Profile extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            userId: 1,
            validUser: false,
            loading: true,
            user: null,
            applications: null,
            jobs: null,
            merge: null,
        };
    }

    getProfile = () => {
        const self = this;
        fetch(url + "/users/getProfile?userId=1"
        ).then(response => {
            this.state.validUser = (response.status === 200);
            if(response.status === 200) {
                return response.json();
            }
            else
                return response;
        })
        .then(myJson => {
            console.log(myJson);
            if(this.state.validUser) {
                this.setState({ loading: false, user : myJson});
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });

    }

    getOpenJobs = () => {
        var apps =
            [
                    {
                        "title": "Garbageman",
                        "location": "New York City, NY",
                        "experienceLevel": 0,
                        "description": "ABCDEFG",
                        "jobStatus": "Open",
                        "company" : "Department of Sanitation",
                        "applicationStatus" : "Pending",
                        "jobId" : 1

                    },
                    {
                        "title": "Garbageman",
                        "location": "New York City, NY",
                        "experienceLevel": 0,
                        "description": "ABCDEFG",
                        "jobStatus": "Open",
                        "company" : "Department of Sanitation",
                        "applicationStatus" : "Pending",
                        "jboId" : 2

                    },
                    {
                        "title": "Garbageman",
                        "location": "New York City, NY",
                        "experienceLevel": 0,
                        "description": "ABCDEFG",
                        "jobStatus": "Open",
                        "company" : "Department of Sanitation",
                        "applicationStatus" : "Pending",
                        "jobId" : 3

                    },
            ]
            this.setState({applications: apps});
            console.log(apps);
            console.log(this.state);
    }

    async componentDidMount() {
        await this.getProfile();
        await this.getApplications();
        await this.getOpenJobs();
        if(this.state.validUser) {
            console.log('test');
        }
    }

    getApplications = () => {
        // const self = this;
        // fetch(url + "/applications/getApplicantApplications?userId=" + this.state.userId, {
        //     method: "GET",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     }
        // ).then(response => {
        //     if(response.status === 200) {
        //         return response.json();
        //     }
        //     else
        //         return response;
        // })
        //     .then(myJson => {
        //         console.log(myJson);
        //         if(this.state.validUser) {
        //             this.setState({applications: myJson});
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error: ', error);
        //     });

    }

    render(){
        const { classes } = this.props;
        let curUser;
        let apps;
        if(!this.state.loading) {
            if(this.state.user.accountType === "Applicant") {
                curUser = (
                    <UserInfo classes={classes} info={this.state.user}/>
                );
                console.log(this.state);
                apps = !this.state.loading ? ((this.state.applications && this.state.applications.length) ? (
                        this.state.applications.map(app => <ApplicantApplicationCard app={app}/>)
                    ) : <h2>No Applications</h2>): (
                        <p>
                            Loading...
                        </p>
                );



            } else {
                curUser = (
                    <div>
                        company
                    </div>
                )
            }
        }
        return(
                <Grid container direction = "row" className={classes.root} justify={'center'} alignItems={'center'}>
                    <Grid item xs={4}>
                        {curUser}
                    </Grid>
                    <Grid item xs={8} className>
                        {apps}
                    </Grid>
                </Grid>

        )
    }
}

// Profile.PropTypes = {
//     classes: PropTypes.object.isRequired,
//     userId: PropTypes.object.isRequired,
// }

export default withStyles(styles)(Profile);
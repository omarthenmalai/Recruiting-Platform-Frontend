import React from 'react'
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CompanyProfile from "../components/CompanyProfile";
import ApplicantProfile from "../components/ApplicantProfile";

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
        fetch(url + "api/currentuser", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        }).then(response => {
            this.state.validUser = (response.status === 200);
            if(response.status === 200) {
                return response.json();
            }
            else
                return response;
        })
        .then(myJson => {
            if(this.state.validUser) {
                console.log(myJson);
                this.setState({ loading: false, user : myJson});
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            window.location.href = "http://localhost:3000/login";
        });

    }


    async componentDidMount() {
        await this.getProfile();
        if(this.state.validUser) {
            console.log('test');
        }
    }


    render(){
        const { classes } = this.props;
        let profile;
        if(this.state.user != null) {
            if(this.state.user.accountType == 'Company') {
                profile = (<CompanyProfile classes={classes} user={this.state.user}/>)
            } else{
                profile = (<ApplicantProfile classes={classes} user={this.state.user}/>)
            }
        } else {
            profile = (
                <div>Loading...</div>
            )
        }
        // var profile = (!this.state.loading) ?
        //     ((<CompanyProfile classes={classes} user={this.state.user}/>)
        //     ) : (
        //         <div>Loading...</div>
        //     )
        var apps = this.state.apps
        return(
                <Grid container direction = "row" className={classes.root} justify={'center'} alignItems={'center'}>
                    <Grid item xs={4}>
                        {profile}
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
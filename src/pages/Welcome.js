import React from 'react';
import { withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';



const url = "http://localhost:8080/"

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validUser: false,
        };
        this.getProfile = this.getProfile.bind(this);
    };

    getProfile = () => {
        const self = this;
        fetch(url + "api/currentuser", {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
        }).then(response => {
            console.log(response.status)
            self.state.validUser = (response.status === 200);
            if(response.status === 200) {
                return response.json();
            }
            else
                return response;
        })
            .then(myJson => {
                if(self.state.validUser) {
                    console.log(myJson);
                    self.setState({ loading: false, user : myJson});
                    window.location.href = "http://localhost:3000/profile"
                    return myJson;
                }
            })
            .catch(error => {
                console.error('Error: ', error);
                window.location.href = "http://localhost:3000/login"

            });

    }


    componentDidMount(){
        this.getProfile();
    }

    render() {
        return(
            <div></div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);
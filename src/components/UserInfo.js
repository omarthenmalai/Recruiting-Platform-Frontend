import React from 'react'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
        }
        this.setDefaults = this.setDefaults.bind(this);
    }

    handleSubmit = values => {}

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    setDefaults = () => {
        const {info :{ username, email, accountType}} = this.props;
        this.setState({ username: username, email: email})
    }

    componentDidMount() {
        this.setDefaults();
    }



    render() {
        const { classes, info: {username, email, accountType}} = this.props;
        return(
            <Grid container>
                <Grid item xs={6}>
                    <Grid className={classes.root} container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                        <Grid item>
                            <h1>
                                Profile Information
                            </h1>
                        </Grid>
                        <Grid item xs={2} className={classes.textfield}>
                            <TextField
                                id="standard-basic"
                                label="First Name"
                                name={'firstName'}
                                onChange={this.handleChange}
                                value={this.state.username}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="standard-basic"
                                label="Email Address"
                                name={'email'}
                                onChange={this.handleChange}
                                value={this.state.email}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={2} clasName={classes.textfield}>
                            <h3 className={classes.textfield}>
                                {accountType}
                            </h3>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        )
    }

}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
}

export default (UserInfo);
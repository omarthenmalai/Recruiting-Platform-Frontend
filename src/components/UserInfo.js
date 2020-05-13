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
    }


    render() {
        const { classes, info: {username, email, accountType}} = this.props;
        return(
                    <Grid className={classes.root} container spacing={2} direction={"column"} alignContent={"center"} justify={"center"}>
                        <Grid item xs={6}>
                            <h1>
                                Profile Information
                            </h1>
                        </Grid>
                        <Grid item xs={6} className={classes.textfield}>
                            <TextField
                                id="standard-basic"
                                label="Username"
                                name={'username'}
                                value={username}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-basic"
                                label="Email Address"
                                name={'email'}
                                value={email}
                                variant={'outlined'}
                                className={classes.textfield}
                            />
                        </Grid>
                        <Grid item xs={6} clasName={classes.textfield}>
                            <h3 className={classes.textfield}>
                                Account Type: {accountType}
                            </h3>
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
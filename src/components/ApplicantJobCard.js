import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Card} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Divider } from '@material-ui/core';

const url = "http://localhost:8080";

const styles = (theme) => ({
    root: {
        minWidth: 275,
    },
    mycard: {
        height: 200,
        width: 800,
        marginBottom: 10,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
});

class JobCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apply: false,
            info: null,
            title: this.props.info.title,
            location: this.props.info.location,
            experienceLevel: this.props.info.experienceLevel,
            salary: this.props.info.salary,
            id: this.props.info.id,
            description: this.props.info.description,
            show: true,
            uploaded: false,
            msg: "",

        };
        this.onFileChange = this.onFileChange.bind(this);
    };


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    openApply = () => {
        this.setState({apply: true, jobId: this.props.info.jobId});
    }

    closeApply = () => {
        this.setState({apply: false});
    }

    onFileChange(event) {
        this.setState({ selectedFile: event.target.files[0] });
        console.log(event.target.files[0]);
    }


    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
        );
        fetch(url + '/api/applications?jobid=' + this.state.id, {
            method: "POST",
            mode: 'no-cors',
            credentials: 'include',
            body: formData,
        })
        .then(response => {
            console.log(response)
            if(response.status == 200) {
                console.log('uploaded')
                this.setState({uploaded: true, msg: "Application successfully submitted!"})
            } else {
                this.setState({msg: "Application successfully submitted!"})
            }
        })
        .catch(error => {
            console.log(error)
        })
    };



    render() {
        const {classes, info: {id, title, salary, experienceLevel, location, description}, user} = this.props;
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        let upload;
        if(!this.state.apply) {
            upload = (<div></div>)
        } else {
            upload = (
                <div>
                    <Grid container direction={"row"} justify={'center'}>
                        <Grid item xs={3}>
                            <input type="file" className={styles.button} onChange={this.onFileChange}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button size="small" variant={'outlined'} color={'primary'} onClick={this.onFileUpload}>
                                Upload
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button size="small" variant={'outlined'} color={'primary'} onClick={this.closeApply}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                    {this.state.msg}
                </div>
            )
        }

        let card = (
            <div>
                <Card className={classes.mycard} variant={"outlined"}>
                    <Grid container direction={"row"} spacing={0} justify={"left"}>
                        <Grid xs={4}>
                            <CardContent>
                                <Typography className="jobTitle" variant="h5" component="h2" color="textPrimary"
                                            gutterBottom>
                                    {title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {experienceLevel} Years Experience Required
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {formatter.format(salary)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant={'outlined'} color={'primary'} onClick={this.openApply}>
                                    Apply
                                </Button>
                            </CardActions>
                        </Grid>
                        <Divider orientation={"vertical"} flexItem/>
                        <Grid item xs={3}>
                            {description}
                        </Grid>
                    </Grid>
                </Card>
                {upload}
            </div>
        )

        return (
            <div>
                {card}
            </div>
        )
    }
}



export default withStyles(styles)(JobCard)
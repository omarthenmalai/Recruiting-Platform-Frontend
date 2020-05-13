import React from 'react'
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";


class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            app: this.props.app,
            applicationStatus: this.props.app.applicationStatus,
        }
    }

    acceptApplication = (status) => {
        console.log(status);

    }

    respondToApplication = (status) => {
        var self = this;
        var endpoint = "http://localhost:8080/api/applications/edit?applicationstatus=" +
            status + "&id=" + this.state.app.id
        fetch(endpoint, {
            method: 'POST',
            mode: "cors",
            credentials: "include"
        })
        .then(response =>{
            console.log(response);
            self.setState({applicationStatus: status});

        })
        .catch(error => {
            console.log(error);
        });
    }


    getResume = () => {
        fetch("http://localhost:8080/api/file?id=" + this.state.app.id, {
            method: "GET",
            mode: "cors",
            credentials: "include"
        })
        .then((response) => response.blob())
        .then((blob) => {

            // 2. Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            const fileName = 'resume_' + 'applicant=' + this.state.app.id + '.pdf'
            link.setAttribute('download', fileName);
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click();
            // 5. Clean up and remove the link
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.log(error);
        })

    }


    render() {
        return(
            <div>
                <Grid container direction={"row"} spacing={3}>
                    <Grid item xs={3}>

                        Status: {this.state.applicationStatus}
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={this.getResume}
                        >
                            Resume
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={() => this.respondToApplication('Accepted')}
                        >
                            Accept
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={() => this.respondToApplication('Rejected')}
                        >
                            Reject
                        </Button>
                    </Grid>
                </Grid>
                <Divider orientation={'horizontal'}/>
            </div>


    )
    }
}

Application.propTypes = {
    app: PropTypes.object.isRequired,
};

export default Application
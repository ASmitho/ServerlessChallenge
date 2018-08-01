import React, { Component, Fragment } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Gym.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, notLoading } from "../actions/loadActions";
import { setGym, setUserId } from "../actions/gymActions";

class Gym extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            gym: "",
            user_id: "",
            generated: false,
        };
    }

    validateForm() {
        return (
            this.state.gym.length > 0
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleGym = async event => {
        event.preventDefault();
        this.props.loading();

        var self = this;

        try {
            fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/listGym', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(function (response) {
                    response.json().then(function (response) {
                        console.log(response.body);
                        //alert(response[1].Gym);
                        self.props.notLoading();
                        if (self.state.generated === false) {
                            for (var i = 0; i < response.length; i++) {
                                self.props.setGym(response[i].Gym);
                                self.props.setUserId(response[i].user_id);
                            }
                        }

                        self.setState({ generated: true });

                        //alert(self.props.Gym);
                        self.props.history.push("/gym");
                    })
                });
        }
        catch (e) {
            console.error(e);
            alert(e.message);
        }
    }


    handleSubmit = async event => {
        event.preventDefault();
        this.props.loading();
        var self = this;

        return new Promise(function (resolve, reject) {
            fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/createGym', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Gym: self.state.gym,
                    user_id: self.props.user.fullname,
                })
            })
                .then(
                    function (response) {
                        if (response.status === 200) {
                            //aert("User: " + this.state.user_id + "was successfully created!");
                            self.props.notLoading();

                            alert(self.props.user.user_id + "'s gym was successfully recorded!");
                            resolve(self.props.user.user_id + "'s gym was successfully recorded!");
                        }
                        else {
                            self.props.notLoading();
                            reject(alert(response.body));
                        }
                    })
        });
    }

    renderGym() {
        return (
            <div>
                <form onSubmit={this.handleGym}>
                    <FormGroup controlId="gym" bsSize="large" style={{ textAlign: "center" }}>
                        <ControlLabel style={{ color: "white" }}>Gym Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="gymName"
                            value={this.state.gym}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        id="gymUpdate"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.props.load.isLoading}
                        text="Update"
                        loadingText="Updating List..."
                        style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
                    />
                </form>
            </div>

        )
    }


    renderForm() {
        return (
            <div className="Gym">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="gym" bsSize="large" style={{ textAlign: "center" }}>
                        <ControlLabel style={{ color: "white" }}>Gym</ControlLabel>
                        <FormControl
                            autoFocus
                            type="gym"
                            value={this.state.gym}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        id="gymsubmit"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.props.load.isLoading}
                        text="Record"
                        loadingText="Recording..."
                        style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
                    />
                </form>
            </div>
        );
    }

    generateUsers() {

        var list = "";

        for (var i = 0; i <= this.props.gym.Gym.length; i++) {
            if (this.state.gym === this.props.gym.Gym[i]) {
                list = list + '   *   ' + this.props.gym.user_id[i];
            }
        };

        list = list + '   *   '
        return list;
    }

    render() {
        return (
            <div className="Gym">
                <h1> Update Gym </h1>
                {this.renderForm()}
                <h1> Which Gym? </h1>
                {this.renderGym()}
                {this.props.gym.user_id[0] && this.props.gym.Gym[0]
                    ? <Fragment>
                        <h1> Gymmates at your Gym: </h1>
                        <h1 style={{ fontSize: "120%" }}> {this.generateUsers()} </h1>
                    </Fragment>
                    : <Fragment>
                        <h1> No Users Available At Your Gym :( </h1>
                    </Fragment>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        load: state.load,
        auth: state.auth,
        gym: state.gym,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loading: loading,
        notLoading: notLoading,
        setGym,
        setUserId,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Gym)
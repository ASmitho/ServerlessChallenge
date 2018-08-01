import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticated, notAuthenticated, authenticating, notAuthenticating } from "../actions/authenticateActions";
import { setUserId, setFullName, setAge, setWeight, setHeight } from "../actions/userActions";
import { loading, notLoading } from "../actions/loadActions";
import { logout } from "../actions/logoutActions";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            user_id: this.props.user.user_id,
            password: "",
            confirmPass: "",
            fullname: this.props.user.fullname,
            age: this.props.user.age,
            height: this.props.user.height,
            weight: this.props.user.weight,
        };
    }

    validateForm() {
        return (
            this.state.user_id.length > 0 &&
            this.state.password.length > 0 &&
            this.state.confirmPass.length > 0 &&
            this.state.fullname.length > 0 &&
            this.state.age > 0 &&
            this.state.height > 0 &&
            this.state.weight > 0 &&
            (this.state.password === this.state.confirmPass)
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.props.loading();
        var self = this;

        console.log(this.props);

        if (this.state.password !== this.props.password.password) {
            alert("incorrect password");
            this.props.history.push("/settings");
            return;
        }

        return new Promise(function (resolve, reject) {
            fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/update/' + self.props.user.user_id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname: self.state.fullname,
                    age: parseInt(self.state.age, 10),
                    height: parseInt(self.state.height, 10),
                    weight: parseInt(self.state.weight, 10),
                })
            })
                .then(
                    function (response) {
                        if (response.status === 200) {
                            //aert("User: " + this.state.user_id + "was successfully created!");
                            self.props.history.push("/dashboard");
                            self.props.notLoading();

                            self.props.setAge(self.state.age);
                            self.props.setFullName(self.state.fullname);
                            self.props.setWeight(self.state.weight);
                            self.props.setHeight(self.state.height);

                            alert(self.state.user_id + "'s account was successfully updated!");
                            resolve(self.state.user_id + "'s account was successfully created!");
                        }
                        else {
                            self.props.notLoading();
                            reject(alert(response.body));
                        }
                    })
        });
    }

    handleDelete = async event => {
        event.preventDefault();
        this.props.loading();
        var self = this;

        if(this.state.password !== this.state.confirmPass){
            alert("passwords do not match");
            this.props.history.push("/settings");
            return;
        }

        if (this.state.password !== this.props.password.password) {
            alert("incorrect password");
            this.props.history.push("/settings");
            return;
        }

        return new Promise(function (resolve, reject) {
            fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/delete/' + self.props.user.user_id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(
                    function (response) {
                        if (response.status === 200) {
                            //aert("User: " + this.state.user_id + "was successfully created!");
                            self.props.notLoading();
                            self.props.logout();
                            self.props.history.push("/");

                            alert(self.state.user_id + "'s account was successfully deleted!");
                            resolve(self.state.user_id + "'s account was successfully deleted!");
                        }
                        else {
                            self.props.notLoading();
                            reject(alert(response.body));
                        }
                    })
        });
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit} >
                <FormGroup controlId="fullname" bsSize="large">
                    <ControlLabel>Fullname</ControlLabel>
                    <FormControl
                        value={this.state.fullname}
                        onChange={this.handleChange}
                        type="fullname"
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPass" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.confirmPass}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="age" bsSize="large">
                    <ControlLabel>Age (years)</ControlLabel>
                    <FormControl
                        value={this.state.age}
                        onChange={this.handleChange}
                        type="number"
                    />
                </FormGroup>
                <FormGroup controlId="weight" bsSize="large">
                    <ControlLabel>Weight (lbs)</ControlLabel>
                    <FormControl
                        value={this.state.weight}
                        onChange={this.handleChange}
                        type="number"
                    />
                </FormGroup>
                <FormGroup controlId="height" bsSize="large">
                    <ControlLabel>Height (inches)</ControlLabel>
                    <FormControl
                        value={this.state.height}
                        onChange={this.handleChange}
                        type="number"
                    />
                </FormGroup>
                <LoaderButton
                    id="updatebutton"
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Update"
                    loadingText="Updating…"
                    style={{ marginTop: "12px", maxWidth: "600px", float: "center" }}
                />
            </form>
        );
    }

    renderDelete() {
        return(
            <form onSubmit={this.handleDelete} style={{marginTop: "10%"}}>
            <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPass" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.confirmPass}
                        onChange={this.handleChange}
                    />
                </FormGroup>
            <LoaderButton
                id="deletebutton"
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Delete Account"
                loadingText="Deleting"
                style={{ marginTop: "12px", maxWidth: "600px", float: "center" }}
            />
            </form >
        )
}

render() {
    return (
        <div className="Settings">
            <h1> What do you need to change? </h1>
            {this.renderForm()}
            {this.renderDelete()}
        </div>
    );
}
}

function mapStateToProps(state) {
    return {
        user: state.user,
        password: state.password,
        load: state.load,
        auth: state.auth,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        authenticated: authenticated,
        notAuthenticated: notAuthenticated,
        authenticating: authenticating,
        notAuthenticating: notAuthenticating,
        setUserId: setUserId,
        setAge: setAge,
        setFullName: setFullName,
        setWeight: setWeight,
        setHeight: setHeight,
        loading: loading,
        notLoading: notLoading,
        logout,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Settings)
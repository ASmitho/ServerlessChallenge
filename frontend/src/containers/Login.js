import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {authenticated, notAuthenticated, authenticating, notAuthenticating} from "../actions/authenticateActions";
import { setUserId } from "../actions/userActions";
import { loading, notLoading } from "../actions/loadActions";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      password: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return(this.state.user_id.length > 0 && this.state.password.length > 0)
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.props.loading(); 
    var self = this;
    try{
      fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/get/' + this.state.user_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       }})
       .then(function(response){
         //alert(response.status);
        if(response.body !== ""){
          console.log(response.status);
          response.json().then(function(data) {
            //console.log('oldstate', this.state);
            if(self.state.password === data.password){
                self.props.setUserId(self.state.user_id);
                alert("Login Successful");
                //console.log('newstate', this.state); // access json.body here
                self.props.authenticated(); 
                self.props.history.push("/dashboard");
             }
            else{
              alert("Incorrect Login Information");
              self.setState({
                user_id: '',
                password: ''
              });
              self.props.notLoading(); 
            } 
          })
        }
        else{
          alert("No user found");
              self.setState({
                user_id: '',
                password: ''
              });
              self.props.notLoading(); 
        }
      })
    }
    catch(e){
      console.error(e);
      alert(e.message);
      self.setState({
        user_id: '',
        password: ''
      });
    self.props.notLoading(); 
    }
  }

  render() {
    return (
      <div className="Login">
        <h1> Let's Get To Work </h1>
        <form id="loginform" onSubmit={this.handleSubmit}>
          <FormGroup controlId="user_id" bsSize="large" style={{textAlign: "center"}}>
            <ControlLabel style={{color: "white"}}>User Id</ControlLabel>
            <FormControl
              autoFocus
              type="user_id"
              value={this.state.user_id}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large" style={{textAlign: "center"}}>
            <ControlLabel style={{color: "white"}}>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            id="loginsubmit"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.props.load.isLoading}
            text="Login"
            loadingText="Logging in…"
            style={{display: "flex", justifyContent: "center", marginTop: "10%"}}
        />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    password: state.password,
    load: state.load,
    auth: state.auth,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    authenticated: authenticated,
    notAuthenticated: notAuthenticated,
    authenticating: authenticating,
    notAuthenticating: notAuthenticating,
    setUserId: setUserId,
    loading: loading, 
    notLoading: notLoading,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login)

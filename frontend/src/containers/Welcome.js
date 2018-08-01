import React, { Component } from "react";
import "./Welcome.css";
import { connect } from "react-redux"
import {bindActionCreators} from "redux";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {logout} from "../actions/logoutActions";
import {addSquat, addBench, addOverhead, addRow, addDeadlift} from "../actions/dataActions";
import {loading, notLoading} from "../actions/loadActions";

class Home extends Component {

  constructor() {
    super();

    this.state = {
      squat: [],
      deadlift: [],
      overheadPress: [],
      benchPress: [],
      barbellRow: [], 
    };
  }

  validateForm() {
    return (
      this.state.squat[0] > 0 &&
      this.state.deadlift[0] > 0 &&
      this.state.overheadPress[0] > 0 &&
      this.state.benchPress[0] > 0 &&
      this.state.barbellRow[0] > 0
    );
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.loading();

    this.props.addBench(this.state.benchPress[0]);
    this.props.addSquat(this.state.squat[0]);
    this.props.addDeadlift(this.state.deadlift[0]);
    this.props.addOverhead(this.state.overheadPress[0]);
    this.props.addRow(this.state.barbellRow[0]);

    var self = this; 

    console.log(self.props.data.benchPress);

    return new Promise (function(resolve, reject) {
      fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/updatedata/' + self.props.user.user_id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          benchPress: self.state.benchPress,
          squat: self.state.squat,
          deadlift: self.state.deadlift,
          overheadPress: self.state.overheadPress,
          barbellRow: self.state.barbellRow
        })
      })
        .then(
          function(response) {
            if (response.status === 200) {
              //aert("User: " + this.state.user_id + "was successfully created!");
              self.props.history.push("/dashboard");
              self.props.notLoading();

              alert(self.props.user.user_id + "'s data was successfully uploaded!");
              resolve(self.props.user.user_id + "'s data was successfully uploaded!"); 
            }
            else{
              self.props.notLoading();
              reject(alert(response.body)); 
            }
          })
      }); 
    }  

  handleChange = event => {
    var temp = parseInt(event.target.value, 10);
    if(isNaN(temp)){
      var txt = document.getElementById(event.target.id); 
      txt = 0; 
      return;
    }
    this.setState({
      [event.target.id]: [parseInt(event.target.value, 10)]
    });
  }

  renderLander() {
    return (
      <div className="lander">
        <h1 style={{color: "white"}}> Hi {this.props.user.fullname}!</h1>
        <h1 style={{color: "white"}}>Welcome to StrengthDev!</h1>
        <p style={{ display: 'flex', justifyContent: 'center', color: "white"}}>Let's Get Started </p>
        </div>
    );
  }

  renderForm(){
    return(
      <form class="liftForm" onSubmit={this.handleSubmit}>
        <FormGroup controlId="squat" bsSize="large">
          <ControlLabel>Barbell Squat</ControlLabel>
          <FormControl
            autoFocus
            type="squat"
            value={this.state.squat}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="benchPress" bsSize="large">
          <ControlLabel>Bench Press</ControlLabel>
          <FormControl
            type="benchPress"
            value={this.state.benchPress}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="deadlift" bsSize="large">
          <ControlLabel>Deadlift</ControlLabel>
          <FormControl
            type="deadlift"
            value={this.state.deadlift}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="overheadPress" bsSize="large">
          <ControlLabel>Overhead Press</ControlLabel>
          <FormControl
            type="overheadPress"
            value={this.state.overheadPress}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="barbellRow" bsSize="large">
          <ControlLabel>Barbell Row</ControlLabel>
          <FormControl
            type="barbellRow"
            value={this.state.barbellRow}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          id="submit"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.props.load.isLoading}
          text="Submit"
          loadingText="Recording Data"
          style={{marginTop: "12px", maxWidth: "600px",}}
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderLander()}
        {this.renderForm()}
      </div>
    );
  }
  
}
 
function mapStateToProps(state){
  return{
    data: state.data,
    user: state.user,
    load: state.load,
    auth: state.auth,
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    logout: logout, 
    loading: loading, 
    notLoading: notLoading,
    addBench: addBench,
    addSquat: addSquat,
    addOverhead: addOverhead,
    addDeadlift: addDeadlift,
    addRow: addRow, 
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Home)


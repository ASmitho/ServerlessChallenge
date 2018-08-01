import React, { Component } from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticated, notAuthenticated, authenticating, notAuthenticating } from "../actions/authenticateActions";
import { setBench, setSquat, setDeadlift, setOverhead, setRow } from "../actions/dataActions";
import { addBench, addSquat, addDeadlift, addOverhead, addRow } from "../actions/dataActions";
import { loading, notLoading } from "../actions/loadActions";
import { logout } from "../actions/logoutActions";
import { setPass } from "../actions/passAction";
import { setUserId, setFullName, setAge, setWeight, setHeight } from "../actions/userActions";
import {
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { LineChart } from 'react-easy-chart';

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {
      squat: [],
      deadlift: [],
      overheadPress: [],
      benchPress: [],
      barbellRow: [],
      gatheredData: false,
      lastupdate: 0,
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

    return new Promise(function (resolve, reject) {
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
          function (response) {
            if (response.status === 200) {
              //aert("User: " + this.state.user_id + "was successfully created!");
              self.props.history.push("/dashboard");
              self.props.notLoading();
              self.setState({ gatheredData: true });

              alert(self.props.user.user_id + "'s data was successfully uploaded!");
              resolve(self.props.user.user_id + "'s data was successfully uploaded!");
            }
            else {
              self.props.notLoading();
              self.setState({ gatheredData: true });
              reject(alert(response.body));
            }
          })
    });
  }

  getData() {
    this.setState({ gatheredData: true });
    this.props.notLoading();

    var self = this;
    try {
      fetch('https://uhyq6pjnf1.execute-api.us-east-2.amazonaws.com/dev/get/' + this.props.user.user_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then(function (response) {
          console.log(response.status);
          response.json().then(function (response) {
            self.props.setBench(response.benchPress);
            self.props.setDeadlift(response.deadlift);
            self.props.setSquat(response.squat);
            self.props.setOverhead(response.overheadPress);
            self.props.setRow(response.barbellRow);
            self.props.setAge(response.age);
            self.props.setFullName(response.fullname);
            self.props.setWeight(response.weight_lb);
            self.props.setHeight(response.height_in);
            self.props.setPass(response.password);
            self.setState({ lastupdate: response.dataUpdate });
          }
          )
        })
    }
    catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  handleChange = event => {
    var temp = parseInt(event.target.value, 10);
    if (isNaN(temp)) {
      var txt = document.getElementById(event.target.id);
      txt = 0;
      return;
    }
    this.setState({
      [event.target.id]: [parseInt(event.target.value, 10)]
    });
  }

  createGraph() {

    const graphdataUpper = [
      [
        { x: 0, y: this.props.data.benchPress[this.props.data.benchPress.length - 5] },
        { x: 1, y: this.props.data.benchPress[this.props.data.benchPress.length - 4] },
        { x: 2, y: this.props.data.benchPress[this.props.data.benchPress.length - 3] },
        { x: 3, y: this.props.data.benchPress[this.props.data.benchPress.length - 2] },
        { x: 4, y: this.props.data.benchPress[this.props.data.benchPress.length - 1] },
      ], [
        { x: 0, y: this.props.data.overheadPress[this.props.data.overheadPress.length - 5] },
        { x: 1, y: this.props.data.overheadPress[this.props.data.overheadPress.length - 4] },
        { x: 2, y: this.props.data.overheadPress[this.props.data.overheadPress.length - 3] },
        { x: 3, y: this.props.data.overheadPress[this.props.data.overheadPress.length - 2] },
        { x: 4, y: this.props.data.overheadPress[this.props.data.overheadPress.length - 1] },
      ], [
        { x: 0, y: this.props.data.barbellRow[this.props.data.barbellRow.length - 5] },
        { x: 1, y: this.props.data.barbellRow[this.props.data.barbellRow.length - 4] },
        { x: 2, y: this.props.data.barbellRow[this.props.data.barbellRow.length - 3] },
        { x: 3, y: this.props.data.barbellRow[this.props.data.barbellRow.length - 2] },
        { x: 4, y: this.props.data.barbellRow[this.props.data.barbellRow.length - 1] },
      ],
    ]

    const graphdataLower = [
      [
        { x: 0, y: this.props.data.squat[this.props.data.squat.length - 5] },
        { x: 1, y: this.props.data.squat[this.props.data.squat.length - 4] },
        { x: 2, y: this.props.data.squat[this.props.data.squat.length - 3] },
        { x: 3, y: this.props.data.squat[this.props.data.squat.length - 2] },
        { x: 4, y: this.props.data.squat[this.props.data.squat.length - 1] },
      ], [
        { x: 0, y: this.props.data.deadlift[this.props.data.deadlift.length - 5] },
        { x: 1, y: this.props.data.deadlift[this.props.data.deadlift.length - 4] },
        { x: 2, y: this.props.data.deadlift[this.props.data.deadlift.length - 3] },
        { x: 3, y: this.props.data.deadlift[this.props.data.deadlift.length - 2] },
        { x: 4, y: this.props.data.deadlift[this.props.data.deadlift.length - 1] },
      ],
    ]

    return (
      <div style={{ display: "inline-block" }}>
        <h1 style={{ color: "white"}}> Compound Progression (lbs) </h1>
        <LineChart
          dataPoints
          xDomainRange={[0, 4]}
          yDomainRange={[Math.min.apply(null, this.props.data.overheadPress) - 40, Math.max.apply(null, this.props.data.benchPress) + 40]}
          axes
          xTicks={4}
          axisLabels={{ x: 'x)', y: 'y' }}
          lineColors={['orange', 'white', 'yellow']}
          width={750}
          height={500}
          data={graphdataUpper}
          style={{ textAlign: "center" }}
        />
        <h1 style={{ color: "white", fontSize: "125%"}}> <font color="orange">Orange</font>: Bench Press &ensp;*&ensp; <font color="white">White</font>: Overhead Press &ensp;*&ensp; <font color="yellow">Yellow</font>: Barbell Row </h1>
        <LineChart
          dataPoints
          xDomainRange={[0, 4]}
          yDomainRange={[Math.min.apply(null, this.props.data.squat) - 25, Math.max.apply(null, this.props.data.deadlift) + 25]}
          axes
          xTicks={4}
          axisLabels={{ x: 'Compound Metrics (increasing recency)', y: 'Weight (lbs)' }}
          lineColors={['cyan', 'yellow']}
          width={750}
          height={500}
          data={graphdataLower}
        />
        <h1 style={{ color: "white", fontSize: "125%"}}> <font color="cyan">Cyan</font>: Squat &ensp;*&ensp; <font color="yellow">Yellow</font>: Deadlift </h1>

      </div>
    )
  }


  renderLander() {
    if (this.state.gatheredData === false) {
      this.getData();
    }

    var timeNow = new Date().getTime();

    return (
      <div className="lander">
        <h1 style={{ color: "white", fontSize: "500%" }}>Hi {this.props.user.fullname}!</h1>
        <div className="numbers">
          <ul className="numbersUL">
            <li style={{ textAlign: "center", fontWeight: "bold" }}> Recent Excercise Metrics (lbs): </li>
            <li> Bench Press: {this.props.data.benchPress[this.props.data.benchPress.length - 1]}  </li>
            <li> Overhead Press: {this.props.data.overheadPress[this.props.data.benchPress.length - 1]} </li>
            <li> Barbell Row: {this.props.data.barbellRow[this.props.data.benchPress.length - 1]} </li>
            <li> Squat: {this.props.data.squat[this.props.data.benchPress.length - 1]} </li>
            <li> Deadlift: {this.props.data.deadlift[this.props.data.benchPress.length - 1]} </li>
          </ul>
          <form class="liftForm" onSubmit={this.handleSubmit}>
            <FormGroup controlId="benchPress" bsSize="small">
              <ControlLabel>Bench Press</ControlLabel>
              <FormControl
                autoFocus
                type="benchPress"
                value={this.state.benchPress}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="overheadPress" bsSize="small">
              <ControlLabel>Overhead</ControlLabel>
              <FormControl
                type="overheadPress"
                value={this.state.overheadPress}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="barbellRow" bsSize="small">
              <ControlLabel>Barbell Row</ControlLabel>
              <FormControl
                type="barbellRow"
                value={this.state.barbellRow}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="squat" bsSize="small">
              <ControlLabel>Barbell Squat</ControlLabel>
              <FormControl
                type="squat"
                value={this.state.squat}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="deadlift" bsSize="small">
              <ControlLabel>Deadlift</ControlLabel>
              <FormControl
                type="deadlift"
                value={this.state.deadlift}
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
              style={{ marginTop: "12px", maxWidth: "600px", }}
            />
          </form>
        </div>
        <div >
          <ul className="numbers2">
            <li style={{ padding: "10px", fontWeight: "bold" }}> This Week's Goals (lbs): </li>
            <li> Squat (lbs): {this.props.data.squat[this.props.data.squat.length - 1] + 10}</li>
            <li> Bench Press (lbs): {this.props.data.benchPress[this.props.data.benchPress.length - 1] + 5}</li>
            <li> Deadlift: {this.props.data.deadlift[this.props.data.deadlift.length - 1] + 10}</li>
            <li style={{ padding: "10px", fontWeight: "bold" }}> Realistic Compound Goals (lbs): </li>
            <li> Squat (lbs): {this.props.user.weight * 1.75}</li>
            <li> Bench Press (lbs): {this.props.user.weight * 1.5}</li>
            <li> Deadlift: {this.props.user.weight * 2}</li>
            <li style={{ padding: "10px", fontWeight: "bold" }}> Competition Compound Goals (lbs): </li>
            <li> Squat (lbs): {this.props.user.weight * 2.5}</li>
            <li> Bench Press (lbs): {this.props.user.weight * 2}</li>
            <li> Deadlift: {this.props.user.weight * 2.75}</li>
            <li style={{ padding: "10px", fontWeight: "bold" }}> Your last workout was {(Math.abs(timeNow - this.state.lastupdate) / (1000 * 60 * 60 * 24)).toFixed(0)} day(s) ago. </li>
          </ul>
        </div>
        <div >
          <ul className="maxes">
            <li style={{ padding: "10px", fontWeight: "bold" }}> More Info: </li>
            <li style={{ padding: "2px" }}> Your BMI: {Number((this.props.user.weight * 0.45) / ((this.props.user.height * 0.025) * (this.props.user.height * 0.025))).toFixed(2)} </li>
            <li style={{ padding: "2px" }}> You should consume {(0.64 * this.props.user.weight).toFixed(2)} to {(0.82 * this.props.user.weight).toFixed(2)} grams of protein for proper development </li>
            <li style={{ padding: "2px" }}> You should consume {(20 * this.props.user.weight).toFixed(2)} calories per day for muscle development (everyday for bulking, otherwise only on workout days)</li>
            <li style={{ padding: "10px", fontWeight: "bold" }}> 1 Rep Max Assuming 5 Reps With Last Measurement (Epley formula): </li>
            <li style={{ padding: "2px" }}> Max Squat (lbs): {(this.props.data.squat[this.props.data.squat.length - 1] * (1 + (5 / 30))).toFixed(2)}</li>
            <li style={{ padding: "2px" }}> Max Bench Press (lbs): {(this.props.data.benchPress[this.props.data.benchPress.length - 1] * (1 + (5 / 30))).toFixed(2)}</li>
            <li style={{ padding: "2px" }}> Max Deadlift: {(this.props.data.deadlift[this.props.data.deadlift.length - 1] * (1 + (5 / 30))).toFixed(2)}</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Dashboard">
        {this.renderLander()}
        {this.createGraph()}
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
    data: state.data,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setBench,
    setDeadlift,
    setOverhead,
    setRow,
    setSquat,
    logout,
    setUserId,
    setAge,
    setFullName,
    setWeight,
    setHeight,
    loading,
    notLoading,
    addBench,
    addSquat,
    addDeadlift,
    addOverhead,
    addRow,
    setPass,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard)


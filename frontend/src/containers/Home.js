import React, { Component } from "react";
import "./Home.css";

class Home extends Component {

  renderLander() {
    return (
      <div className="lander">
        <h1 style={{color: "red", fontSize: "700%"}}>StrengthDev</h1>
        <p style={{color: "white", fontSize: "200%"}}>Resource for Strength Training</p>
        <p style={{color: "blue", padding: "10px", fontSize: "200%"}}>Tracking performance and providing tools since 2018</p>
        <div><img style={{width:"30%", height: "30%"}} src={'https://pre00.deviantart.net/86db/th/pre/i/2015/164/c/4/most_american_wallpaper_ever_by_themoderator-d8x44zy.png'}/></div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderLander()}
      </div>
    );
  }
  
}
 
export default Home;
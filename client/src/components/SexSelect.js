import React, { Component } from "react";
import agenderBlackIcon from "../../src/assets/gender/agender-black.png";
import agenderColorIcon from "../../src/assets/gender/agender-color.png";
import maleBlackIcon from "../../src/assets/gender/male-black.png";
import maleColorIcon from "../../src/assets/gender/male-color.png";
import femaleBlackIcon from "../../src/assets/gender/female-black.png";
import femaleColorIcon from "../../src/assets/gender/female-color.png";
import { connect } from "react-redux";

export class sexSelect extends Component {
  constructor(props) {
    super(props);
    this.handleGenderValue = this.handleGenderValue.bind(this);

    this.state = {
      male: this.props.genderstate === "male" ? true : false,
      female: this.props.genderstate === "female" ? true : false,
      agender: this.props.genderstate === "agender" ? true : false,
    };
  }

  handleGenderValue(e) {
    console.log(e.target.id);
    if (e.target.id === "malelabel") {
      this.setState({
        male: true,
        female: false,
        agender: false,
      });
    } else if (e.target.id === "femalelabel") {
      this.setState({
        male: false,
        female: true,
        agender: false,
      });
    } else if (e.target.id === "rathernotsaylable") {
      this.setState({
        male: false,
        female: false,
        agender: true,
      });
    }

    if (this.state.female) {
      this.props.setFormGender("female");
    } else if (this.state.male) {
      this.props.setFormGender("male");
    } else if (this.state.agender) {
      this.props.setFormGender("agender");
    }
  }

  render() {
    return (
      <div className="sex-checkbox-wrapper">
        <div className="gender-container" onClick={this.handleGenderValue}>
          <input type="radio" name="genderoption" id="male" value="male" />
          <label htmlFor="male" id="malelabel">
            <img src={this.state.male ? maleColorIcon : maleBlackIcon} />
            آقا
          </label>
        </div>
        <div className="gender-container" onClick={this.handleGenderValue}>
          <input type="radio" name="genderoption" id="female" value="female" />
          <label htmlFor="female" id="femalelabel">
            <img src={this.state.female ? femaleColorIcon : femaleBlackIcon} />
            خانم
          </label>
        </div>
        <div className="gender-container" onClick={this.handleGenderValue}>
          <input
            type="radio"
            name="genderoption"
            id="rathernotsay"
            value="rathernotsay"
          />

          <label htmlFor="rathernotsay" id="rathernotsaylable">
            {" "}
            <img
              src={this.state.agender ? agenderColorIcon : agenderBlackIcon}
            />{" "}
            ترجیح میدم مشخص نکنم
          </label>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    genderstate: state.user.gender,
  };
};

export default connect(mapStatetoProps)(sexSelect);

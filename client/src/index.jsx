import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PriceStars from "./components/priceStars.jsx";
import GuestsBar from "./components/guests/guestsBar.jsx";
import { Grid, Row, Col } from "react-flexbox-grid";
import moment from "moment";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import Total from "./components/total.jsx";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listToggle: "ToggleStart",
      arrowImg: "down",
      guests: 0,
      max: 0,
      minStay: 0,
      numRatings: 0,
      price: 0,
      stars: 0,
      apartmentid: 0,
      startDate: 0,
      endDate: 0,
      dates: ["11/01/2018"],
      BAD_DATES: [moment()]
    };
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList(event) {
    event.preventDefault();
    if (this.state.listToggle === "ToggleStart") {
      this.setState({ listToggle: "ToggleOn", arrowImg: "up" });
    } else {
      this.setState({ listToggle: "ToggleStart", arrowImg: "down" });
    }
  }

  increaseGuests() {
    this.setState({
      guests: this.state.guests + 1
    });
  }

  decreaseGuests(event) {
    event.preventDefault();
    this.setState({
      guests: this.state.guests - 1
    });
  }

  componentDidMount() {
    let queryString = window.location;
    let listingId = queryString.search.split("=")[1];
    console.log(listingId)
    if (listingId) {
      axios.get(`http://ec2-54-209-75-211.compute-1.amazonaws.com/api/listing/${listingId}`)
      .then(({data}) => {
        console.log(data)
        if(data.length !== 0) {
          this.setState({
            max: data[0].max,
            price: data[0].price,
            stars: parseInt(data[0].stars)
          })
        }
      	var badDates = data.map(({date}) => {
      		return moment(date.toString())
        })
      	return badDates
      }).catch((err)=>{
      	console.error(err)
      }).then((momentsArr)=>{
      	this.setState({BAD_DATES: momentsArr})
      })
    }
  }

  render() {
    const isDayBlocked = day =>
      this.state.BAD_DATES.filter(d => d.isSame(day, "day")).length > 0;
    return (
      <div className="Master">
        <Grid fluid>
          <Row>
            <PriceStars
              price={this.state.price}
              guests={this.state.guests}
              rating={this.state.stars}
            />
          </Row>
          <div className="Headertext">Dates</div>
          <Row>
            <DateRangePicker
              startDate={this.state.startDate}
              startDateId="your_unique_start_date_id"
              endDate={this.state.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) => {
                console.log(startDate);
                this.setState({ startDate, endDate });
              }}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              minimumNights={this.state.minStay}
              numberOfMonths={1}
              isDayBlocked={isDayBlocked}
              hideKeyboardShortcutsPanel={true}
            />
          </Row>
          <br />
          <div className="Headertext">Guests</div>
          <Row>
            <button onClick={this.toggleList} className="Button" type="button">
              <Row>
                <Col xs={6}>
                  {`${this.state.guests} `}
                  {this.state.guests > 1 ? "guests" : "guest"}
                </Col>
                <Col xs={2} xsOffset={4}>
                  <img
                    src={require(`../dist/images/${
                      this.state.arrowImg
                    }-arrow.png`)}
                    height="20px"
                    width="20px"
                  />
                </Col>
              </Row>
            </button>
          </Row>
          <Row>
            <Col>
              <GuestsBar
                guests={this.state.guests}
                inf={this.state.infants}
                max={this.state.max}
                visible={this.state.listToggle}
                add={this.increaseGuests.bind(this)}
                minus={this.decreaseGuests.bind(this)}
              />
            </Col>
          </Row>
          {this.state.guests === this.state.max && this.state.endDate ? (
            <Total
              start={this.state.startDate}
              end={this.state.endDate}
              guests={this.state.guests}
              price={this.state.price}
            />
          ) : (
            <br />
          )}
          <br />
          <Row>
            <button className="ButtonBook" type="button">
              <Row center="xs">
                <Col xs={3} className="BookButtonFont">
                  Book
                </Col>
              </Row>
            </button>
          </Row>
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<Booking />, document.getElementById("booking"));

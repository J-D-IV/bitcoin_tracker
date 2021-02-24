import React from 'react';
import DatePicker from 'react-datepicker';

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sYr: '',
      sMo: '',
      sDay: '',
      eYr: '',
      eMo: '',
      eDay: '',
    }
  }
  setResult(e , start, end){
   e.preventDefault();

   let startYear = start.slice(0, 4);
   let startMonth = start.slice(5, 7);
   let startDay = start.slice(8, 10);
   let endYear = end.slice(0, 4);
   let endMonth = end.slice(5, 7);
   let endDay = end.slice(8, 10);

   this.props.getRange(startYear, startMonth, startDay, endYear, endMonth, endDay)
   this.setState({
     sYr: startYear,
     sMo: startMonth,
     sDay: startDay,
     eYr: endYear,
     eMo: endMonth,
     eDay: endDay
   })
  }

  render() {
    return (
      <div style={{
        textAlign: 'center'
      }}>

        <button style={{ fontWeight: 'bolder' }} type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Choose a date range! <i className="fas fa-calendar-day"></i>
        </button>

        <button style={{ fontWeight: 'bold' }} onClick={(e) => this.props.resetRange(e)} className="btn btn-dark" >
          Reset Range <i className="fas fa-hand-peace"></i>
        </button>

        <div className="modal fade modal-dialog" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Select a date range below <i className="far fa-hand-point-down"></i></h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="input-group input-daterange">
                  <input id="startDate" type="date" className="form-control" />
                  <div style={{ marginLeft: '5px', marginRight: '5px', marginTop: '5px'}} className="input-group-addon"> <i className="fas fa-exchange-alt"></i> </div>
                  <input id="endDate" type="date" className="form-control" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close <i className="fas fa-times"></i></button>
                <button onClick={(e) => {
                  let start = document.getElementById('startDate').value;
                  let end = document.getElementById('endDate').value;
                  this.setResult(e, start, end)
                  }
                 } type="button" className="btn btn-primary">Submit <i className="fas fa-share" data-bs-dismiss="modal"></i></button>
              </div>

            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default Modal
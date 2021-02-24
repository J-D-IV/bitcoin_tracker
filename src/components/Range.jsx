import React from 'react';

const Range = (props) => (
  <div clasName="row card justify-content-center">
      {/* <div className="accordion accordion-flush align-self-center"> */}
        <div style={{ textAlign: 'center', backgroundColor: 'white'}} className="accordion-item">
          <h2 className="accordion-header" id="headingOne" >
            <button
              style={{ color: 'black', fontWeight: 'bolder'}}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne">
                Price List
              </button>
          </h2>
        </div>
        {Object.entries(props.range).map(([key,value]) => {
          return <div id="collapseOne" className="accordion-collapse collapse justify-content-center">
            <div style={{ width: '100%' }} className="accordion-body bg-light">
              <div className="card-body text-center">
                {key.slice(5, 7)}-{key.slice(8, 10)}-{key.slice(0, 4)} : <i className="fas fa-dollar-sign"></i>{value}
              </div>
            </div>
          </div>
        })}
      {/* </div> */}

  </div>
)
export default Range;

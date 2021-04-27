import React from "react"
// import PropTypes from 'prop-types'
import { Link } from "gatsby"
import Intro from '../components/examples/Intro'
import ExampleCard from "../components/examples/ExampleCard"



const ExamplesPage = () => {
  const examples = [
    {
      id: '123',
      title: "Instagram: No Option for “No”",
      summary: "A brief summary - Pellentesque at bibendum mauris, in porta nisi",
      url: "/"
    }
  ]
  return (
    <>
      <Intro />
      <section>
        <div className="container">
          {/* <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <span>Sort By</span>Most Recent
            </div>
          </div> */}
          <div className="row">
            <div className="col-12 col-md-4">
              <h2>Harms</h2>
              <ul className="list-of-harms">
                <li>
                  <input
                    type="checkbox"
                    id="harmOne"
                    name="harmOne"
                    value="Bike"
                  />
                  <label htmlFor="harmOne">Stole my personal Information</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="harmTwo"
                    name="harmTwo"
                    value="Bike"
                  />
                  <label htmlFor="harmTwo">Charged me more money</label>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-8">
              <div className="row">
                {examples && examples.map(example => {
                  const { id } = example
                  return (
                    <div key={id} className="col-12 col-md-6 my-4">
                      <ExampleCard example={example} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ExamplesPage.propTypes = {

}

ExamplesPage.defaultProps = {

}

export default ExamplesPage

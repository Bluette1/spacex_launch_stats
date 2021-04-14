import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query launchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({
  match: {
    params
  },
}) => {
  let flightNumber = params.flight_number;
  flightNumber = parseInt(flightNumber);
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: flightNumber },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error :( ${error}`}</p>;

  const {
    flight_number,
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;


  return < div>
  <h1 className="display-4 my-3">
  <span className="text-dark">Mission: </span>
  {mission_name}
  </h1>
  <h4 className="mb-3">Launch Details</h4>
  <ul className="list-group">
    <li className="list-group-item">Flight Number: {flight_number}</li>
    <li className="list-group-item">Launch Year: {launch_year}</li>
    <li className="list-group-item">Launch Success:&nbsp;
    <span className={classNames({
      'text-success': launch_success,
      'text-danger': !launch_success,
    })}>
    {launch_success ? 'Yes' : 'No'}</span> </li>
  </ul>
  <h4 className="my-3">Rocket Details</h4>
  <ul className="list-group">
    <li className="list-group-item">Rocket ID: {rocket_id}</li>
    <li className="list-group-item">Rocket Name: {rocket_name}</li>
    <li className="list-group-item">Rocket Type: {rocket_type}</li>
  </ul>
  <hr/>
  <Link to="/" className="btn btn-secondary">Back</Link>
  </div>;
};

export default Launch;

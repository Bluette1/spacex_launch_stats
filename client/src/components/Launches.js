import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import uuid from 'react-uuid';
import LaunchItem from './LaunchItem';
import MissionKey from './Missionkey';

const LAUNCHES_QUERY = gql`
  query launchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error :( ${error}`}</p>;

  return (
    <Fragment>
      <h4 className="display-4 my-3">Launches</h4>
      <MissionKey/>
      <Fragment>
        {data.launches.map((launch) => (
          <LaunchItem key={ `${launch.flight_number}-${uuid()}`} launch={launch} />
        ))}
      </Fragment>
    </Fragment>
  );
};

export default Launches;

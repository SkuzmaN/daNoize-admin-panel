import gql from 'graphql-tag';

export default gql`
query EventsList {
  events{
    uuid
    title
    plannedStartDate
    status
    attenders{
      uuid
      score
      team{
        name
        uuid
      }
    }
  }
}
`;
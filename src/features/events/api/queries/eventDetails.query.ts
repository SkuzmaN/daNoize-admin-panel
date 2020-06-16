import gql from 'graphql-tag';

export default gql`
query EventDetails($uuid: String!) {
  event(uuid: $uuid) {
    uuid
    title
    plannedStartDate
    status
    incidents(orderBy: { createdAt: desc }) {
      uuid
      type
      variables
      createdAt
    }
    attenders {
      uuid
      team {
        name
        logo
      }
      score
      availableReactions {
        uuid
        reaction {
          type
        }
      }
    }
  }
}

`
import gql from 'graphql-tag';

export default gql`
subscription attenderModified($event: String!) {
  attenderModified(event: $event) {
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
`
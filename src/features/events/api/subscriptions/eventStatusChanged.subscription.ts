import gql from 'graphql-tag';

export default gql`
subscription EventStatusChanged($event: String!) {
  eventStatusChanged(event: $event) {
    status
  }
}
`
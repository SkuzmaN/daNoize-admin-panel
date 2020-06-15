import gql from 'graphql-tag';

export default gql`
subscription IncidentAppeared($event:String!){
  incidentAppeared(event:$event){
    uuid
      type
      variables
      createdAt
  }
}
`
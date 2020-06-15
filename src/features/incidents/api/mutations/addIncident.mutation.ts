import gql from 'graphql-tag';

export default gql`
mutation AddIncident($event:String!,$variables:String!){
  addIncident(event:$event type:"message" variables:$variables){
    uuid
      type
      variables
      createdAt
  }
}
`
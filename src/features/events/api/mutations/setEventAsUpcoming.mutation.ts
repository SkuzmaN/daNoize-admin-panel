import gql from 'graphql-tag';

export default gql`
mutation SetEventAsUpcoming($event:String!){
  setEventAsUpcoming(event:$event){
    status
  }
}`
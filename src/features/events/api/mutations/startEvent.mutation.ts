import gql from 'graphql-tag';

export default gql`
mutation StartEvent($event:String!){
  startEvent(event:$event){
    status
  }
}`
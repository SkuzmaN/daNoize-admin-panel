import gql from 'graphql-tag';

export default gql`
mutation StopEvent($event:String!){
  stopEvent(event:$event){
    status
  }
}`
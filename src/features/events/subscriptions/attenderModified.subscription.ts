import gql from 'graphql-tag';

export default gql`
subscription attenderModified($event:String!){
  attenderModified(event:$event){
    supportersNum
  }
}
`
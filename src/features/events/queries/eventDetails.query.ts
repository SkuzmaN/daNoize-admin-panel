import gql from 'graphql-tag';

export default gql`
query EventDetails($uuid:String!){
  event(uuid:$uuid){
    attenders{
      team{
        name
      }
      score
    }
  }
}
`
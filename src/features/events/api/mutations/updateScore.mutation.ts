import gql from 'graphql-tag';

export default gql`
mutation ChangeScore($attender:String!,$score:Int!){
  changeScore(attender: $attender, score: $score) {
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
}`
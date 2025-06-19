import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments {
    comments {
      id
      author
      text
      created_at
      replies {
        id
        author
        text
        created_at
      }
    }
  }
`;

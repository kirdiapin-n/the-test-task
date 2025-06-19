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

export const GET_COMMENT_COORDS = gql`
  query GetCommentCoords {
    comments {
      id
      text
      highlight_coords {
        id
        comment_id
        x
        y
        width
        height
      }
    }
  }
`;

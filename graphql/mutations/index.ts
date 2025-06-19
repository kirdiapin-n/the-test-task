import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: NewCommentInput!) {
    createComment(input: $input) {
      id
      highlight_coords {
        x
        y
        id
        comment_id
        width
        height
      }
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation CreateReply($input: NewReplyInput!) {
    createReply(input: $input) {
      id
    }
  }
`;

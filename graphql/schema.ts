import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Comment {
    id: ID!
    author: String!
    created_at: String!
    text: String!
    highlight_coords: HighlightCoords!
    replies: [Reply!]!
  }

  type Reply {
    id: ID!
    author: String!
    created_at: String!
    text: String!
    comment_id: ID!
  }

  type HighlightCoords {
    id: ID!
    comment_id: ID!
    x: Float!
    y: Float!
    width: Float!
    height: Float!
  }

  type Query {
    comments: [Comment!]!
  }

  input NewCommentInput {
    author: String!
    text: String!
    highlight_coords: NewHighlightCoordsInput!
  }

  input NewHighlightCoordsInput {
    x: Float!
    y: Float!
    width: Float!
    height: Float!
  }

  input NewReplyInput {
    author: String!
    text: String!
    comment_id: ID!
  }

  type Mutation {
    createComment(input: NewCommentInput!): Comment!
    createReply(input: NewReplyInput!): Reply!
  }
`;

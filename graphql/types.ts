export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export interface IComment {
  author: Scalars["String"]["output"];
  created_at: Scalars["String"]["output"];
  highlight_coords: IHighlightCoords;
  id: Scalars["ID"]["output"];
  replies?: Maybe<Array<IReply>>;
  text: Scalars["String"]["output"];
}

export interface IHighlightCoords {
  comment_id: Scalars["ID"]["output"];
  height: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  width: Scalars["Float"]["output"];
  x: Scalars["Float"]["output"];
  y: Scalars["Float"]["output"];
}

export interface IMutation {
  createComment: IComment;
  createReply: IReply;
}

export interface IMutationCreateCommentArgs {
  input: INewCommentInput;
}

export interface IMutationCreateReplyArgs {
  input: INewReplyInput;
}

export interface INewCommentInput {
  author: Scalars["String"]["input"];
  highlight_coords: INewHighlightCoordsInput;
  text: Scalars["String"]["input"];
}

export interface INewHighlightCoordsInput {
  height: Scalars["Float"]["input"];
  width: Scalars["Float"]["input"];
  x: Scalars["Float"]["input"];
  y: Scalars["Float"]["input"];
}

export interface INewReplyInput {
  author: Scalars["String"]["input"];
  comment_id: Scalars["ID"]["input"];
  text: Scalars["String"]["input"];
}

export interface IQuery {
  comments: Array<IComment>;
}

export interface IReply {
  author: Scalars["String"]["output"];
  comment_id: Scalars["ID"]["output"];
  created_at: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  text: Scalars["String"]["output"];
}

export type ICreateCommentMutationVariables = Exact<{
  input: INewCommentInput;
}>;

export type ICreateCommentMutation = {
  createComment: {
    id: string;
    highlight_coords: { x: number; y: number; id: string; comment_id: string; width: number; height: number };
  };
};

export type ICreateReplyMutationVariables = Exact<{
  input: INewReplyInput;
}>;

export type ICreateReplyMutation = { createReply: { id: string } };

export type IGetCommentsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetCommentsQuery = {
  comments: Array<{
    id: string;
    author: string;
    text: string;
    created_at: string;
    replies?: Array<{ id: string; author: string; text: string; created_at: string }> | null;
  }>;
};

import { resolvers } from "./resolvers";
import { IMutationCreateCommentArgs, IMutationCreateReplyArgs } from "@/graphql/types";
import { describe, beforeEach, test, expect } from "vitest";

import * as ResolverModule from "./resolvers";

const resetData = () => {
  ResolverModule.comments.length = 0;
  ResolverModule.replies.length = 0;
  ResolverModule.highlightCoords.length = 0;
};

describe("GraphQL Resolvers", () => {
  beforeEach(() => {
    resetData();
  });

  test("createComment adds a new comment with highlight_coords", () => {
    const input: IMutationCreateCommentArgs = {
      input: {
        text: "Test comment",
        author: "Alice",
        highlight_coords: { x: 10, y: 20, width: 30, height: 40 },
      },
    };

    const result = resolvers.Mutation.createComment(null, input);

    expect(result.text).toBe("Test comment");
    expect(result.author).toBe("Alice");
    expect(result.replies).toEqual([]);
    expect(result.highlight_coords).toMatchObject({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      comment_id: result.id,
    });

    expect(ResolverModule.comments).toHaveLength(1);
    expect(ResolverModule.highlightCoords).toHaveLength(1);
  });

  test("createReply adds a reply to the replies array", () => {
    const input: IMutationCreateReplyArgs = {
      input: {
        comment_id: "123",
        text: "Reply!",
        author: "Bob",
      },
    };

    const result = resolvers.Mutation.createReply(null, input);

    expect(result).toMatchObject({
      comment_id: "123",
      text: "Reply!",
      author: "Bob",
    });

    expect(ResolverModule.replies).toContainEqual(result);
  });

  test("comments query returns comments with replies and highlight_coords", () => {
    const commentResult = resolvers.Mutation.createComment(null, {
      input: {
        text: "Top comment",
        author: "Eve",
        highlight_coords: { x: 1, y: 1, width: 5, height: 5 },
      },
    });

    resolvers.Mutation.createReply(null, {
      input: {
        comment_id: commentResult.id,
        text: "Nice!",
        author: "Frank",
      },
    });

    const all = resolvers.Query.comments();

    expect(all).toHaveLength(1);
    expect(all[0].replies).toHaveLength(1);
    expect(all[0].highlight_coords).not.toBeNull();
  });
});

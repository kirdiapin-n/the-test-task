import {
  IComment,
  IHighlightCoords,
  IMutationCreateCommentArgs,
  IMutationCreateReplyArgs,
  IReply,
} from "@/graphql/types";

const comments: Omit<IComment, "highlight_coords">[] = [];
const replies: IReply[] = [];
const highlightCoords: IHighlightCoords[] = [];

export const resolvers = {
  Query: {
    comments: () => {
      return comments.map((comment) => ({
        ...comment,
        replies: replies.filter((r) => r.comment_id === comment.id),
        highlight_coords: highlightCoords.find((h) => h.comment_id === comment.id) || null,
      }));
    },
  },
  Mutation: {
    createComment: (_: unknown, { input }: IMutationCreateCommentArgs) => {
      const id = String(Date.now());
      const created_at = new Date().toISOString();
      const newComment = { id, created_at, ...input };

      comments.push(newComment);

      if (input.highlight_coords) {
        highlightCoords.push({
          ...input.highlight_coords,
          id: `coords-${id}`,
          comment_id: id,
        });
      }

      return {
        ...newComment,
        replies: [],
        highlight_coords: input.highlight_coords
          ? { ...input.highlight_coords, id: `coords-${id}`, comment_id: id }
          : null,
      };
    },

    createReply: (_: unknown, { input }: IMutationCreateReplyArgs) => {
      const id = String(Date.now());
      const created_at = new Date().toISOString();
      const reply = { id, created_at, ...input };
      replies.push(reply);
      return reply;
    },
  },
};

import {
  IComment,
  IHighlightCoords,
  IMutationCreateCommentArgs,
  IMutationCreateReplyArgs,
  IReply,
} from "@/graphql/types";

const comments: Omit<IComment, "highlight_coords">[] = [
  { id: "1", author: "author", text: "some text", created_at: new Date().toISOString() },
  {
    id: "2",
    author: "author",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    created_at: new Date().toISOString(),
  },
];
const replies: IReply[] = [
  { comment_id: "1", text: "reply text", id: "1", author: "author", created_at: new Date().toISOString() },
];
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

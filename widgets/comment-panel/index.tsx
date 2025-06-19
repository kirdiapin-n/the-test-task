"use client";

import { CREATE_REPLY } from "@/graphql/mutations";
import { GET_COMMENTS } from "@/graphql/queries";
import { ICreateReplyMutation, ICreateReplyMutationVariables, IGetCommentsQuery } from "@/graphql/types";
import { CommentType } from "@/types";
import CommentForm from "@/ui/CommentForm";
import { getAuthorAndDate } from "@/widgets/comment-panel/utils";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Box, Button, ScrollArea, Text } from "@mantine/core";
import React from "react";

export default function CommentPanel() {
  const [replyId, setReplyId] = React.useState<string | null>(null);
  const { data, loading } = useQuery<IGetCommentsQuery>(GET_COMMENTS);

  const [createReply] = useMutation<ICreateReplyMutation, ICreateReplyMutationVariables>(CREATE_REPLY);
  const client = useApolloClient();

  const handleReply = async ({ text, author }: CommentType) => {
    if (!replyId) return;

    await createReply({
      variables: {
        input: {
          comment_id: replyId,
          author,
          text,
        },
      },
    });

    await client.refetchQueries({ include: ["GetComments"] });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <ScrollArea scrollbars="y">
      <Box m="sm" mb="xl">
        <h2>Comments</h2>

        {data?.comments.map((comment) => (
          <Box key={comment.id} mb="lg">
            <Text size="sm">{comment.text}</Text>

            <Text size="xs" c="dimmed">
              {getAuthorAndDate(comment)}
            </Text>

            <Button size="xs" variant="subtle" mt={4} onClick={() => setReplyId(comment.id)}>
              reply
            </Button>

            <Box ml="sm">
              {comment.replies?.map((reply) => (
                <Box key={reply.id} pl="md" mt={4}>
                  <Text size="xs">{reply.text}</Text>

                  <Text size="xs" c="dimmed">
                    {getAuthorAndDate(reply)}
                  </Text>
                </Box>
              ))}
            </Box>

            {comment.id === replyId && <CommentForm onSubmitAction={handleReply} submitText="Send" />}
          </Box>
        ))}
      </Box>
    </ScrollArea>
  );
}

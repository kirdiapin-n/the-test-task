"use client";

import { GET_COMMENTS } from "@/graphql/queries";
import { IGetCommentsQuery } from "@/graphql/types";
import { getAuthorAndDate } from "@/widgets/comment-panel/utils";
import { useQuery } from "@apollo/client";
import { Box, ScrollArea, Text } from "@mantine/core";
import React from "react";

export default function CommentPanel() {
  const { data, loading } = useQuery<IGetCommentsQuery>(GET_COMMENTS);

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
          </Box>
        ))}
      </Box>
    </ScrollArea>
  );
}

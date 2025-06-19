"use client";

import { CREATE_COMMENT } from "@/graphql/mutations";
import {
  ICreateCommentMutation,
  ICreateCommentMutationVariables,
  IHighlightCoords,
  INewHighlightCoordsInput,
} from "@/graphql/types";
import { CommentType } from "@/types";
import AnnotationArea from "@/ui/AnnotationArea";
import CommentForm from "@/ui/CommentForm";
import { useApolloClient, useMutation } from "@apollo/client";
import { Box, Modal } from "@mantine/core";
import React, { useState } from "react";

export default function AnnotatedZone({ children }: { children: React.ReactNode }) {
  const client = useApolloClient();
  const [areas, setAreas] = useState<IHighlightCoords[]>([]);
  const [newArea, setNewArea] = useState<INewHighlightCoordsInput | null>(null);

  const [createComment] = useMutation<ICreateCommentMutation, ICreateCommentMutationVariables>(CREATE_COMMENT);

  const handleSubmit = async ({ text, author }: CommentType) => {
    if (newArea && text && author) {
      const { data } = await createComment({
        variables: { input: { highlight_coords: newArea, text, author } },
      });

      const coords = data?.createComment?.highlight_coords;
      if (coords) {
        setAreas((prev) => [...prev, coords]);
      }
    }
    resetArea();
    await client.refetchQueries({ include: ["GetComments"] });
  };

  const resetArea = () => setNewArea(null);

  return (
    <>
      <AnnotationArea onFinish={(newArea) => setNewArea(newArea)}>
        <Box p="xs">{children}</Box>

        {areas.map(({ id, width, height, x, y }) => (
          <Box
            key={id}
            left={x}
            top={y}
            w={width}
            h={height}
            pos="absolute"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              border: "2px solid red",
            }}
          />
        ))}
      </AnnotationArea>

      <Modal opened={!!newArea} onClose={() => setNewArea(null)} title="New Comment">
        <CommentForm onSubmitAction={handleSubmit} submitText="Save" />
      </Modal>
    </>
  );
}

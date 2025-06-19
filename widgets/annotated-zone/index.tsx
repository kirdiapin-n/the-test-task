"use client";

import { CREATE_COMMENT } from "@/graphql/mutations";
import {
  ICreateCommentMutation,
  ICreateCommentMutationVariables,
  IHighlightCoords,
  INewHighlightCoordsInput,
} from "@/graphql/types";
import { CommentType } from "@/types";
import CommentForm from "@/ui/CommentForm";
import { useApolloClient, useMutation } from "@apollo/client";
import { Modal } from "@mantine/core";
import React, { useState } from "react";

export default function AnnotatedZone() {
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
      {JSON.stringify(areas)}

      <Modal opened={!!newArea} onClose={() => setNewArea(null)} title="New Comment">
        <CommentForm onSubmitAction={handleSubmit} submitText="Save" />
      </Modal>
    </>
  );
}

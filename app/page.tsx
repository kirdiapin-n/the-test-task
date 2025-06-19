import { GET_COMMENT_COORDS } from "@/graphql/queries";
import { IGetCommentCoordsQuery } from "@/graphql/types";
import { getClient } from "@/lib/ssrApolloClient";
import { ExampleComp } from "@/ui/ExampleComp";
import AnnotatedZone from "@/widgets/annotated-zone";
import CommentPanel from "@/widgets/comment-panel";
import { AppShell, AppShellMain, AppShellNavbar } from "@mantine/core";

export default async function Home() {
  const client = getClient();
  const { data } = await client.query<IGetCommentCoordsQuery>({
    query: GET_COMMENT_COORDS,
  });

  const highlightCoords = data.comments.map(({ highlight_coords }) => highlight_coords);

  return (
    <AppShell padding="md" layout="default" navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShellNavbar p="md">
        <CommentPanel />
      </AppShellNavbar>

      <AppShellMain>
        <AnnotatedZone highlightCoords={highlightCoords}>
          <ExampleComp />
        </AnnotatedZone>
      </AppShellMain>
    </AppShell>
  );
}

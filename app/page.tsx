import { ExampleComp } from "@/ui/ExampleComp";
import AnnotatedZone from "@/widgets/annotated-zone";
import CommentPanel from "@/widgets/comment-panel";
import { AppShell, AppShellMain, AppShellNavbar } from "@mantine/core";

export default async function Home() {
  return (
    <AppShell padding="md" layout="default" navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShellNavbar p="md">
        <CommentPanel />
      </AppShellNavbar>

      <AppShellMain>
        <AnnotatedZone>
          <ExampleComp />
        </AnnotatedZone>
      </AppShellMain>
    </AppShell>
  );
}

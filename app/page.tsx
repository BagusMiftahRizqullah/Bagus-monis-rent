import { WorkspaceLayout } from '@/components/workspace/workspace-layout';
import { FloatingGradient } from '@/components/ui/floating-gradient';

export default function Home() {
  return (
    <>
      <FloatingGradient />
      <main className="h-screen overflow-hidden">
        <WorkspaceLayout />
      </main>
    </>
  );
}

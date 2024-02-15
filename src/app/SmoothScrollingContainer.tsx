import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollingContainerProps {
    children: React.ReactNode;
}

function SmoothScrollingContainer({ children }: SmoothScrollingContainerProps) {
  return (
    <ReactLenis root={false} options={{ lerp:  0.1, duration:  1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrollingContainer;

import { Box } from "@mantine/core";
import React, { useRef, useState } from "react";

type Coords = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  children: React.ReactNode;
  onFinish: (value: Coords) => void;
};

export default function AnnotationArea({ children, onFinish }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState<Pick<Coords, "x" | "y"> | null>(null);
  const [current, setCurrent] = useState<Pick<Coords, "x" | "y"> | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setCurrent(null);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !start) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setCurrent({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = () => {
    if (!isDragging || !start || !current) {
      setIsDragging(false);
      return;
    }

    const x = Math.min(start.x, current.x);
    const y = Math.min(start.y, current.y);
    const width = Math.abs(current.x - start.x);
    const height = Math.abs(current.y - start.y);

    if (width < 5 || height < 5) {
      setIsDragging(false);
      setStart(null);
      setCurrent(null);
      return;
    }

    onFinish({ x, y, width, height });

    setIsDragging(false);
    setStart(null);
    setCurrent(null);
  };

  return (
    <Box
      ref={containerRef}
      pos="relative"
      bg="gray.1"
      h={500}
      w={1000}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}

      {isDragging && start && current && (
        <Box
          pos="absolute"
          left={Math.min(start.x, current.x)}
          top={Math.min(start.y, current.y)}
          w={Math.abs(current.x - start.x)}
          h={Math.abs(current.y - start.y)}
          style={{
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            border: "2px dashed blue",
          }}
        />
      )}
    </Box>
  );
}

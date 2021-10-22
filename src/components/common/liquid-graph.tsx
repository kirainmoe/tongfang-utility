import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface LiquidGraphProps {
  width: number;
  height: number;
  percent: number;
  frameDuration: number;
  backgroundColor: string;
  fontColor: string;
  fillColor: string;
  text?: string;
}

const pi2 = Math.PI * 2;

export function LiquidGraph({
  width,
  height,
  percent,
  backgroundColor,
  fillColor,
  fontColor,
  frameDuration,
  text,
}: LiquidGraphProps) {
  const canvasRef = createRef<HTMLCanvasElement>();
  const offlineCanvasRef = useRef<HTMLCanvasElement>();
  const setTimeoutRef = useRef<NodeJS.Timeout>();
  const canvasWidth = width * 2;
  const canvasHeight = height * 2;

  const [offset, setOffset] = useState(0);
  const [centerX, centerY] = [width, height];
  const radius = Math.min(width, height) * 0.98;

  const draw = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    offlineCanvasRef.current = document.createElement('canvas');
    offlineCanvasRef.current.width = canvasWidth;
    offlineCanvasRef.current.height = canvasHeight;

    const ctx = offlineCanvasRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, pi2);
    ctx.clip();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const fromY = centerY - radius * ((percent - 50) / 50);
    const angle = Math.abs(Math.asin((centerY - fromY) / radius));
    const fromX = centerX - radius * Math.cos(angle);
    const endX = fromX + 2 * radius * Math.cos(angle);
    const diffX = endX - fromX;
    const diffY = radius;

    let x = fromX - diffX + offset,
      y = fromY;
    const stepX = diffX * 0.25,
      stepY = diffY * 0.1,
      offsetStep = diffX * 0.02;

    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(
      (x = x + stepX),
      (y += stepY),
      (x = x + stepX),
      (y -= stepY)
    );

    ctx.quadraticCurveTo(
      (x = x + stepX),
      (y -= stepY),
      (x = x + stepX),
      (y += stepY)
    );
    ctx.quadraticCurveTo(
      (x = x + stepX),
      (y += stepY),
      (x = x + stepX),
      (y -= stepY)
    );
    ctx.quadraticCurveTo(
      (x = x + stepX),
      (y -= stepY),
      (x = x + stepX),
      (y += stepY)
    );

    ctx.lineTo(canvasWidth, fromY);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(0, fromY);
    ctx.fill();

    ctx.strokeStyle = fillColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 2, 0, pi2);
    ctx.stroke();

    ctx.fillStyle = fontColor;

    if (text) {
      let baseY = centerY + ctx.measureText(`${percent}%`).actualBoundingBoxAscent;
      ctx.font = `${radius * 0.22}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${percent}%`, centerX, centerY - ctx.measureText(`${percent}%`).actualBoundingBoxAscent / 2);

      ctx.font = `${radius * 0.18}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(text, centerX, baseY + ctx.measureText(text).actualBoundingBoxAscent, diffX);
    } else {
      ctx.font = `${radius * 0.25}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(`${percent}%`, centerX, centerY + ctx.measureText(`${percent}%`).actualBoundingBoxAscent / 2);
    }

    const onlineCtx = canvasRef.current.getContext('2d')!;
    onlineCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    onlineCtx.drawImage(offlineCanvasRef.current, 0, 0);

    setTimeoutRef.current = setTimeout(
      () =>
        setOffset(offset > diffX || Math.abs(offset - diffX) < 1e-6 ? 0 : offset + offsetStep),
      frameDuration,
    );
  }, [
    canvasRef,
    canvasWidth,
    canvasHeight,
    centerX,
    centerY,
    frameDuration,
    backgroundColor,
    fillColor,
    fontColor,
    percent,
    text,
    radius,
    offset,
  ]);

  useEffect(() => {
    draw();
    return () => {
      if (setTimeoutRef.current)
        clearTimeout(setTimeoutRef.current);
    }
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="liquid-graph"
      style={{
        width,
        height,
      }}
    />
  );
}

LiquidGraph.defaultProps = {
  width: 150,
  height: 150,
  backgroundColor: '#bae7ff',
  fillColor: '#6aa1ff',
  fontColor: '#fff',
  frameDuration: 50,
};

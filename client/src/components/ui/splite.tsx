import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spliteVariants = cva(
  "relative flex w-full overflow-hidden rounded-md",
  {
    variants: {
      size: {
        sm: "h-32 md:h-40 lg:h-44",
        md: "h-36 md:h-48 lg:h-56",
        lg: "h-44 md:h-64 lg:h-80",
        xl: "h-52 md:h-80 lg:h-96",
        "2xl": "h-64 md:h-96 lg:h-[32rem]",
        "3xl": "h-72 md:h-[28rem] lg:h-[36rem]",
        "4xl": "h-80 md:h-[32rem] lg:h-[40rem]",
        "5xl": "h-96 md:h-[36rem] lg:h-[48rem]",
        "6xl": "h-[28rem] md:h-[40rem] lg:h-[56rem]",
        full: "h-screen",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

export interface SpliteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spliteVariants> {
  leftSide?: React.ReactNode
  rightSide?: React.ReactNode
  initialPosition?: number
  minPosition?: number
  maxPosition?: number
  gapSize?: number
  dragging?: boolean
  onPositionChange?: (position: number) => void
}

const Splite = React.forwardRef<HTMLDivElement, SpliteProps>(
  (
    {
      className,
      leftSide,
      rightSide,
      size,
      initialPosition = 50,
      minPosition = 20,
      maxPosition = 80,
      gapSize = 0,
      dragging = true,
      onPositionChange,
      ...props
    },
    forwardedRef
  ) => {
    const [position, setPosition] = React.useState(initialPosition)
    const [isDragging, setIsDragging] = React.useState(false)
    const spliteRef = React.useRef<HTMLDivElement>(null)
    const leftSideRef = React.useRef<HTMLDivElement>(null)
    const rightSideRef = React.useRef<HTMLDivElement>(null)
    const handlerRef = React.useRef<HTMLDivElement>(null)

    // Update handler positions
    React.useEffect(() => {
      if (leftSideRef.current && rightSideRef.current && handlerRef.current) {
        leftSideRef.current.style.width = `${position}%`
        rightSideRef.current.style.width = `${100 - position}%`
        handlerRef.current.style.left = `${position}%`
      }
    }, [position])

    // Call onPositionChange when position changes
    React.useEffect(() => {
      if (onPositionChange) {
        onPositionChange(position)
      }
    }, [position, onPositionChange])

    // Handle mouse and touch events
    const startDragging = () => {
      if (dragging) {
        setIsDragging(true)
      }
    }

    const stopDragging = () => {
      setIsDragging(false)
    }

    const handleMouseMove = (clientX: number) => {
      if (isDragging && spliteRef.current) {
        const rect = spliteRef.current.getBoundingClientRect()
        let newPosition = ((clientX - rect.left) / rect.width) * 100

        // Clamp position between minPosition and maxPosition
        newPosition = Math.max(minPosition, Math.min(maxPosition, newPosition))

        setPosition(newPosition)
      }
    }

    React.useEffect(() => {
      const handleMouseMoveEvent = (e: MouseEvent) => handleMouseMove(e.clientX)
      const handleTouchMoveEvent = (e: TouchEvent) =>
        handleMouseMove(e.touches[0].clientX)

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMoveEvent)
        document.addEventListener("touchmove", handleTouchMoveEvent)
        document.addEventListener("mouseup", stopDragging)
        document.addEventListener("touchend", stopDragging)
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMoveEvent)
        document.removeEventListener("touchmove", handleTouchMoveEvent)
        document.removeEventListener("mouseup", stopDragging)
        document.removeEventListener("touchend", stopDragging)
      }
    }, [isDragging])

    return (
      <div
        ref={(el) => {
          // Set our internal ref
          spliteRef.current = el
          
          // Handle the forwarded ref
          if (forwardedRef) {
            if (typeof forwardedRef === "function") {
              forwardedRef(el)
            }
            // We don't try to set .current directly anymore
          }
        }}
        className={cn(spliteVariants({ size }), className)}
        {...props}
      >
        <div
          ref={leftSideRef}
          className="absolute inset-0 w-1/2 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          {leftSide}
        </div>

        <div
          ref={handlerRef}
          className={cn(
            "absolute top-0 bottom-0 z-10 flex -translate-x-1/2 cursor-col-resize touch-none items-center justify-center",
            isDragging && "pointer-events-none"
          )}
          style={{ left: `${position}%` }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          <div
            className={cn(
              "relative h-full w-0.5 bg-primary",
              gapSize > 0 && "bg-transparent"
            )}
          >
            {gapSize > 0 && (
              <div className="absolute top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1 backdrop-blur">
                <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <div className="h-1 w-1 rounded-full bg-primary" />
                  <div className="h-1 w-1 rounded-full bg-primary" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          ref={rightSideRef}
          className="absolute inset-0 left-1/2 w-1/2 overflow-hidden"
          style={{ width: `${100 - position}%` }}
        >
          {rightSide}
        </div>
      </div>
    )
  }
)

Splite.displayName = "Splite"

export { Splite }
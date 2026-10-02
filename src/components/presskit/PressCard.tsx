"use client";
import type { CardData } from "@/lib/presskitReleases";
import { PreviewCard } from "@base-ui/react/preview-card";
import Image from "next/image";
import { type ReactNode, useId, useRef, useState } from "react";

const cardHandle = PreviewCard.createHandle<CardData>();

const isExternal = (href: string) => !href.startsWith("/");

const BAR_CLEARANCE = 88;

export function CardLink({
  card,
  className,
  children,
}: {
  card: CardData;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();

  const pressedWith = useRef("");
  const external = isExternal(card.href);
  const describedBy = `${id}-card`;

  return (
    <>
      <PreviewCard.Trigger
        handle={cardHandle}
        payload={card}
        id={id}
        href={card.href}
        delay={500}
        closeDelay={200}
        aria-describedby={describedBy}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={
          className ??
          "underline decoration-dotted underline-offset-4 outline-none hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-popup-open:text-accent"
        }
        onPointerDown={(e) => {
          pressedWith.current = e.pointerType;
        }}
        onClick={(e) => {
          const type = pressedWith.current;
          pressedWith.current = "";
          if (
            type !== "touch" ||
            e.currentTarget.hasAttribute("data-popup-open")
          )
            return;
          e.preventDefault();
          cardHandle.open(id);
        }}
      >
        {children}
        {external && <span aria-hidden> ↗</span>}
      </PreviewCard.Trigger>
      <span id={describedBy} hidden>
        {card.title}. {card.description}
      </span>
    </>
  );
}

export function CardHost() {
  const layer = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={layer} />
      <PreviewCard.Root handle={cardHandle}>
        {({ payload }) => (
          <PreviewCard.Portal container={layer}>
            <PreviewCard.Positioner
              side="bottom"
              align="start"
              sideOffset={8}
              collisionPadding={{
                top: 8,
                right: 8,
                bottom: BAR_CLEARANCE,
                left: 8,
              }}
              className="z-50"
            >
              <PreviewCard.Popup className="w-80 max-w-(--available-width) origin-(--transform-origin) overflow-hidden border-2 border-dashed border-foreground/60 bg-background text-foreground motion-safe:transition-[opacity,scale,translate] motion-safe:duration-150 motion-safe:ease-out data-starting-style:-translate-y-1 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:-translate-y-1 data-ending-style:scale-95 data-ending-style:opacity-0">
                {payload && <CardBody key={payload.href} card={payload} />}
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        )}
      </PreviewCard.Root>
    </>
  );
}

function CardBody({ card }: { card: CardData }) {
  const [failed, setFailed] = useState(false);
  const image = failed ? undefined : card.image;
  const external = isExternal(card.href);

  return (
    <>
      {image && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={image}
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="absolute inset-0 size-full scale-150 object-cover blur-2xl"
            onError={() => {
              setFailed(true);
            }}
          />
          <Image
            src={image}
            alt=""
            width={320}
            height={160}
            className="relative mx-auto h-full w-auto object-contain"
            onError={() => {
              setFailed(true);
            }}
          />
        </div>
      )}
      <div className="p-3">
        <p className="font-bold text-accent lowercase">{card.title}</p>
        <p className="mt-1 text-sm">{card.description}</p>
        {card.quote && <p className="mt-2 text-xs italic">{card.quote}</p>}
        <a
          href={card.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-2 hidden min-h-11 items-center text-sm underline pointer-coarse:inline-flex"
        >
          open ↗
        </a>
      </div>
    </>
  );
}

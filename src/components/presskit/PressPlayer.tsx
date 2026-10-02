"use client";
import type { Track } from "@/lib/presskit";
import { Slider } from "@base-ui/react/slider";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useInView } from "react-intersection-observer";

type Status = "idle" | "loading" | "playing" | "paused";

const clock = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

const button =
  "min-h-9 min-w-11 cursor-pointer hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2" +
  " focus-visible:outline-accent";

export function PressPlayer({ tracks }: { tracks: Track[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [failed, setFailed] = useState<readonly string[]>([]);

  const { ref: playerRef, inView, entry } = useInView({ initialInView: true });

  const current = index === null ? undefined : tracks[index];

  const start = (i: number) => {
    const audio = audioRef.current;
    const track = tracks[i];
    if (!audio) return;
    if (!track) {
      audio.pause();
      setStatus("idle");
      return;
    }
    setIndex(i);
    setStatus("loading");
    setTime(track.hook ?? 0);
    setDuration(0);
    audio.src = track.hook ? `${track.src}#t=${track.hook}` : track.src;
    audio.play().catch((err: unknown) => {
      if (err instanceof DOMException && err.name === "NotAllowedError")
        setStatus("paused");
    });
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || index === null) return;
    if (audio.paused) void audio.play();
    else audio.pause();
  };

  const fromTheTop = () => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = 0;
  };

  const next = () => {
    if (index !== null) start(index + 1);
  };

  useLayoutEffect(() => {
    const audio = audioRef.current;
    const onPageHide = () => audio?.pause();
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      audio?.pause();
    };
  }, []);

  const backToPlayer = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    entry?.target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section ref={playerRef} aria-label="listen">
      <audio
        ref={audioRef}
        preload="none"
        onPlaying={() => {
          setStatus("playing");
        }}
        onPause={(e) => {
          if (!e.currentTarget.ended) setStatus("paused");
        }}
        onWaiting={() => {
          setStatus("loading");
        }}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          setDuration(audio.duration);
          const hook = current?.hook;
          if (hook && audio.currentTime < hook - 1) audio.currentTime = hook;
        }}
        onTimeUpdate={(e) => {
          if (!dragging) setTime(e.currentTarget.currentTime);
        }}
        onEnded={next}
        onError={() => {
          if (!current) return;
          setFailed((f) => [...f, current.id]);
          next();
        }}
      />

      <h2 className="mb-2 font-mono text-xl font-bold">listen</h2>
      <ol>
        {tracks.map((track, i) => {
          const active = i === index;
          const playing = active && status === "playing";
          return (
            <li
              key={track.id}
              aria-current={active || undefined}
              className={`flex items-center gap-3 ${active ? "text-accent" : ""}`}
            >
              <button
                type="button"
                className={button}
                aria-label={playing ? "pause" : `play ${track.title}`}
                onClick={() => {
                  if (active) toggle();
                  else start(i);
                }}
              >
                {playing ? "pause |" : "play |"}
              </button>
              <span>{track.title}</span>
              <span className="text-sm">
                {failed.includes(track.id)
                  ? "couldn't load this one"
                  : active && status === "loading"
                    ? "loading…"
                    : null}
              </span>
            </li>
          );
        })}
      </ol>

      {current && (
        <div className="mt-3 flex gap-3">
          <Image
            src={current.artwork}
            alt=""
            width={96}
            height={96}
            className="size-24 shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="font-bold">{current.title}</p>
            <p className="text-sm">{current.from}</p>
            <Slider.Root
              value={time}
              min={0}
              max={duration || 1}
              step={1}
              disabled={duration === 0}
              onValueChange={(v) => {
                setDragging(true);
                setTime(v);
              }}
              onValueCommitted={(v) => {
                const audio = audioRef.current;
                if (audio) audio.currentTime = v;
                setDragging(false);
              }}
            >
              <Slider.Control className="flex w-full touch-none items-center py-3 select-none">
                <Slider.Track className="h-1 w-full bg-foreground/30">
                  <Slider.Indicator className="bg-accent" />
                  <Slider.Thumb
                    aria-label="seek"
                    getAriaValueText={(_, value) =>
                      `${clock(value)} of ${clock(duration)}`
                    }
                    className="size-4 bg-accent has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
                  />
                </Slider.Track>
              </Slider.Control>
            </Slider.Root>
            <p className="text-sm">
              {status === "loading"
                ? "loading…"
                : `${clock(time)} / ${clock(duration)}`}
            </p>
            <div className="flex flex-wrap flex-col">
              <div>
                {current.hook !== undefined && (
                  <button type="button" className={button} onClick={fromTheTop}>
                    from the top
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4">
                {current.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {current &&
        !inView &&
        createPortal(
          <div className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center gap-3 border-t-2 border-dashed border-foreground/40 bg-background px-4">
            <Image
              src={current.artwork}
              alt=""
              width={40}
              height={40}
              className="size-10"
            />
            <button
              type="button"
              className="min-h-11 min-w-0 flex-1 cursor-pointer truncate text-left hover:text-accent"
              onClick={backToPlayer}
            >
              {current.title}
            </button>
            <button
              type="button"
              className={button}
              aria-label={
                status === "playing" ? "pause" : `play ${current.title}`
              }
              onClick={toggle}
            >
              {status === "playing" ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              className={button}
              aria-label="next"
              onClick={next}
            >
              ⏭
            </button>
          </div>,
          document.getElementById("player-bar") ?? document.body,
        )}
    </section>
  );
}

"use client";

import GPXMapClient from "./GPXMapClient";

export default function GPXMap({
  url,
}: {
  url: string;
}) {
  return <GPXMapClient url={url} />;
}
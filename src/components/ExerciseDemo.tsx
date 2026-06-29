import React from 'react';

interface Props {
  youtubeQuery: string;
  accentColor: string;
}

export function ExerciseDemo({ youtubeQuery, accentColor }: Props) {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`;
  return (
    <div className="demo-wrapper">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="yt-btn"
        style={{ borderColor: accentColor, color: accentColor }}
      >
        ▶ Watch on YouTube
      </a>
    </div>
  );
}

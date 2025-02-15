import type { FC } from "react"

interface CardProps {
  title: string
  content: string
  url: string
  score: number
}

const Card: FC<CardProps> = ({ title, content, url, score }) => {
  return (
    <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-opacity-40 transition-all duration-300 border border-sky-500/30">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-sky-300">{title}</h2>
        <div
          className="text-gray-300 mb-4 overflow-hidden max-h-24"
          dangerouslySetInnerHTML={{ __html: content || "No content available" }}
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 hover:underline"
        >
          Read more
        </a>
        <div className="mt-4 text-sm text-gray-400">Score: {score}</div>
      </div>
    </div>
  )
}

export default Card


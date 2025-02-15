"use client"

import { useState, useEffect } from "react"
import Card from "./Components/Card"
import Loader from "./Components/Loader"

interface RedditPost {
  data: {
    title: string
    selftext_html: string
    url: string
    score: number
  }
}

export default function Home() {
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://www.reddit.com/r/reactjs.json")

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch posts`)
        }

        const data = await response.json()
        setPosts(data.data.children)
      } catch (err) {
        setError("Oops! Something went wrong while fetching posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) return <Loader />

  if (error) return <div className="text-center text-red-500 text-lg">{error}</div>

  return (
    <main className="min-h-screen bg-gradient-to-t from-[#30cfd0] to-[#330867] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-300">
          Latest Posts from r/reactjs
        </h1>

        {posts.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No posts available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card
                key={post.data.url}
                title={post.data.title}
                content={post.data.selftext_html}
                url={post.data.url}
                score={post.data.score}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

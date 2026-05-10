"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blogs";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((b) => b.category === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {blogCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-navy text-white shadow-md"
                : "bg-white text-text-secondary hover:bg-sky-50 hover:text-navy border border-border-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              {/* Image Placeholder */}
              <div className="h-44 bg-gradient-to-br from-navy/80 to-sky/70 flex items-center justify-center p-6">
                <h3 className="text-base font-bold text-white text-center leading-snug line-clamp-3">
                  {post.title}
                </h3>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-sky-50 text-sky hover:bg-sky-50 font-medium"
                  >
                    {post.category}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary">No articles found in this category.</p>
        </div>
      )}
    </>
  );
}

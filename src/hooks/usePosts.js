import { useMemo } from "react";
import { less } from '../utils/util.js'

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort)
          return [...posts].sort((a, b) => less(a[sort], b[sort]))
        return posts
      }, [posts, sort])
    
      return sortedPosts
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo (
        () => sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())), 
        [query, sortedPosts]
    )
    return sortedAndSearchedPosts
}
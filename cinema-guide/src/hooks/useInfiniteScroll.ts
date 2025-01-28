import { useEffect } from "react";

interface InfiniteScrollOptions {
  loadMore?: () => Promise<void>;
  hasMore: boolean;
}

const useInfiniteScroll = ({ loadMore, hasMore }: InfiniteScrollOptions) => {
  useEffect(() => {
    if (!loadMore || !hasMore) return; 

    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        await loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, hasMore]);
};

export default useInfiniteScroll;

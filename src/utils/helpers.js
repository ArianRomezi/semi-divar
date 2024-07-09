const filterPosts = (posts, category) => {
  if (!category) return posts;
  const filteredPosts = posts.filter((post) => post.category === category);
  return filteredPosts;
};
export { filterPosts };

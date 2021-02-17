// Get Visible Post list for Admin Based on Filter and Search Criteria

const getVisiblePosts = (posts, { text = '', searchBy = 'postText' }) => {
  if (searchBy === 'postText') {
    return posts.filter((post) =>
      post.text.toLowerCase().includes(text.toLowerCase())
    );
  } else if (searchBy === 'postUser') {
    return posts.filter((post) =>
      post.name.toLowerCase().includes(text.toLowerCase())
    );
  }
};

export default getVisiblePosts;

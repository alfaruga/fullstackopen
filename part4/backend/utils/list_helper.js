const dummyFunction = (array) => {
  return 1;
};

const totalLikes = (listOfBlogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return listOfBlogs.reduce(reducer, 0);
};

const favoriteBlog = (listOfBlogs) => {
  const reducerFunc = (mostLiked, currentBlog) => {
    if (mostLiked.likes < currentBlog.likes) {
      return {
        title: currentBlog.title,
        author: currentBlog.author,
        likes: currentBlog.likes,
      };
    }
    return mostLiked;
  };
  return listOfBlogs.reduce(reducerFunc, { likes: -1 });
};

const mostBlogs = (listOfBlogs) => {
  const authorsArticlesFilter = (listOfAuthors, blogItem) => {
    listOfAuthors[blogItem.author] === undefined
      ? (listOfAuthors[blogItem.author] = 1)
      : listOfAuthors[blogItem.author]++;

    return listOfAuthors;
  };

  const articlesPerAuthor = listOfBlogs.reduce(authorsArticlesFilter, {});
  //list of authors can be done in a single line, for calrity I separated the callback in reduce

  const findPopularAuthor = (mostActive, currentAuthor) => {
    if (mostActive.blogs < currentAuthor.blogs) {
      mostActive.author = currentAuthor.author;
      mostActive.blogs = currentAuthor.blogs;
    }
    return mostActive;
  };
  const mostActiveAuthor = { blogs: -1 };

  for (const [author, blogs] of Object.entries(articlesPerAuthor)) {
    findPopularAuthor(mostActiveAuthor, { author, blogs });
  }
  //this one stills bothers me I couldn't compact this part. I had to use a callback again
  return mostActiveAuthor;
};

const mostLikes = (listOfBlogs) => {
  const authorsLikesFilter = (list, currentBlog) => {
    list[currentBlog.author] === undefined
      ? (list[currentBlog.author] = currentBlog.likes)
      : (list[currentBlog.author] += currentBlog.likes);

    return list;
  };

  const authorsAndLikes = listOfBlogs.reduce(authorsLikesFilter, {});

  const findMostLikedAtuhor = (mostLiked, currenAuthor) => {
    if (mostLiked.likes < currenAuthor.likes) {
      mostLiked["likes"] = currenAuthor.likes;
      mostLiked.author = currenAuthor.author;
    }
    return mostLiked;
  };

  const mostLikedAuthor = { likes: -1 };
  for (const [author, likes] of Object.entries(authorsAndLikes)) {
    findMostLikedAtuhor(mostLikedAuthor, { author, likes });
  }

  return mostLikedAuthor;
};
module.exports = {
  dummyFunction,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

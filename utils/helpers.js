// TODO: Format date (for blog posts/comments)
module.exports = {
    format_date: (date) => {
      // Date displayed as MM/DD/YYYY
      return date.toLocaleDateString();
    },
  };
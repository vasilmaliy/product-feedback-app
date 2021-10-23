const feedbacks = (selector, data, categoriesHolderSelector) => {
  let feedbacksArray = data;
  const feedbacksHolder = document.querySelector(selector);
  const filterCategoriesHolder = document.querySelector(categoriesHolderSelector);

  const filterByCategory = (category) => {
    feedbacksArray = data.filter((feedback) => {
      if (category === 'all') {
        return true;
      }

      return feedback.category === category;
    });

    render();
  };

  // asc - ascending
  const sortByUpvotes = (asc = false) => {
    const dirModifier = asc ? 1 : -1;
    feedbacksArray.sort((aFeedback, bFeedback) => (aFeedback.upvotes > bFeedback.upvotes) ? (1 * dirModifier) : (-1 * dirModifier));
  };
  
  const sortByNumberOfComments = (asc = false) => {
    const dirModifier = asc ? 1 : -1;
    feedbacksArray.sort((aFeedback, bFeedback) => (aFeedback.comments.length > bFeedback.comments.length) ? (1 * dirModifier) : (-1 * dirModifier));
  };

  const handleFilterClick = (event) => {
    let target = event.target;

    filterByCategory(target.getAttribute('data-category'));
  };

  filterCategoriesHolder.addEventListener('click', handleFilterClick);

  const render = () => {
    feedbacksHolder.innerHTML = '';

    let htmlFeedbacks = '';
    feedbacksArray.forEach((feedback) => {
      htmlFeedbacks += `
      <div class="main__feedback-holder">
                <section class="feedback-post">
                  <div class="feedback-post__votes">
                    <button class="vote-counter">
                      <img src="./img/shared/icon-arrow-up.svg" alt="" class="feedback-post__icon-arrow" data-voted='false'>
                      <span id="nuber-of-comments" class="str-number-of-comments">${feedback.upvotes}</span>
                    </button>
                  </div>
                  <div class="feedback-post__information">
                    <h2 class="feedback-post__title">4 tags for solutions</h2>
                    <p class="feedback-post__description">Easier to search for solutions based on a specific stack.</p>
                    <div class="feedback-post__categorys-container">
                      <button class="feedback-post__category">${feedback.category}</button>
                    </div>
                  </div>
                  <div class="feedback-post__number-of-comments" >
                    <img src="./img/shared/icon-comments.svg" alt="" class="icon-comments">
                    <span id="feedback-post-number-of-comments">${feedback.comments ? feedback.comments.length : 0}</span>
                  </div>
                </section>
      </div> 
      `;
    });

    feedbacksHolder.innerHTML = htmlFeedbacks;
  };

  render();
};

export default feedbacks;

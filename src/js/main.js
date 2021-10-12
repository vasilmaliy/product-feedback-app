import feedbacks from './components/feedbacks';
import data from '../data/data.json'

window.addEventListener('DOMContentLoaded', () => {

  feedbacks('.main', data.productRequests, '.sheet__navbar-list ');
  
});
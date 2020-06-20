const dataStates = {
  notAsked: 'notAsked',
  loading: 'loading',
  loaded: 'loaded',
  failed: 'failed',
};

const comments = {
  dataState: dataStates.notAsked,
  errorText: '',
  data: [],

  get isLoading() {
    return this.dataState === dataStates.loading;
  },

  get isLoaded() {
    return this.dataState === dataStates.loaded;
  },

  get isError() {
    return this.dataState === dataStates.failed;
  },
};

function loadComments() {
  comments.dataState = dataStates.loading;

  fetch('/comments')
    .then((response) => response.json())
    .then((data) => {
      comments.dataState = dataStates.loaded;
      comments.data = data;
    })
    .catch((error) => {
      comments.dataState = dataStates.failed;
      comments.errorText = error.message;
    });
}

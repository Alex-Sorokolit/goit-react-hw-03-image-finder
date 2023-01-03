const getImages = (nextQuery, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${nextQuery}&page=${page}&key=30638456-f2e7f2d4200256b3df9ced703&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Пошук за запитом ${nextQuery} не дав результатів`)
    );
  });
};

export default getImages;

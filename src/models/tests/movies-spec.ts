import { Movie, MovieStore } from '../movies';

const store = new MovieStore()

describe("Movie Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  // it('should have a show method', () => {
  //   expect(store.index).toBeDefined();
  // });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  // it('should have a update method', () => {
  //   expect(store.index).toBeDefined();
  // });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  // it('create method should add a movie', async () => {
  //   const result = await store.create({
  //     id: 0,
  //     title: 'Bridge to Terabithia',
  //     genre: 'Action',
  //     movie_length: 12345,
  //   });
  //   expect(result).toEqual({
  //     id: 1,
  //     title: 'Bridge to Terabithia',
  //     genre: 'Action',
  //     movie_length: 12345
  //   });
  // });

  // it('index method should return a list of movies', async () => {
  //   const result = await store.index();
  //   expect(result).toEqual([{
  //     id: 1,
  //     title: 'Bridge to Terabithia',
  //     genre: 'Action',
  //     movie_length: 12345
  //   }]);
  // });

  // it('show method should return the correct book', async () => {
  //   const result = await store.show("1");
  //   expect(result).toEqual({
  //     id: "1",
  //     title: 'Bridge to Terabithia',
  //     totalPages: 250,
  //     author: 'Katherine Paterson',
  //     summary: 'Childrens'
  //   });
  // });

  // it('delete method should remove the movie', async () => {
  //   store.delete(1);
  //   const result = await store.index()

  //   expect(result).toEqual([]);
  // });
});
declare global {
  //eslint-disable-next-line no-var
  var testServer: import("supertest").SuperTest<import("supertest").Test>;
}

export {};

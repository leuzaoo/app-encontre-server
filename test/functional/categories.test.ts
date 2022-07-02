import supertest from "supertest";

describe("Categories", () => {
  it("returns categories correctly", async () => {
    const { body, status } = await supertest(app).get("/services");
    expect(status).toBe(200);
    expect(body).toBe([{ name: "Barber shop" }]);
  });
});

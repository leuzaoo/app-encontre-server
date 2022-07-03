describe("Locations", () => {
  it("returns correct locations", async () => {
    const { body, status } = await global.testServer.get("/locations");
    expect(status).toBe(200);
    expect(body).toStrictEqual([{ name: "Barber shop" }]);
  });
});

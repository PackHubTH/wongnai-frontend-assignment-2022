import request from "supertest";
import app from "../../index";

describe("GET /:restaurantId", () => {
  it("400, restaurantsId is not number", async () => {
    const res = await request(app).get("/abc");
    expect(res.status).toBe(400);
  });

  it("404, restaurantsId is not found", async () => {
    const res = await request(app).get("/123");
    expect(res.status).toBe(404);
  });

  it("200, restaurantsId is found", async () => {
    const res = await request(app).get("/227018?cursor=1");
    expect(res.body.menus[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(String),
        fullPrice: expect.any(Number),
        discountedPercent: expect.any(Number),
        sold: expect.any(Number),
        totalInStock: expect.any(Number),
      })
    )
  }); 
});

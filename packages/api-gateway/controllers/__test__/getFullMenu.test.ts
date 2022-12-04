import request from "supertest";
import app from "../../index";

describe("GET /:restaurantId/full-menu/:menuName", () => {
  it("400, restaurantsId is not number", async () => {
    const res = await request(app).get("/abc/full-menu/abc");
    expect(res.status).toBe(400);
  });

  it("404, restaurantsId is not found", async () => {
    const res = await request(app).get("/123/full-menu/abc");
    expect(res.status).toBe(404);
  });

  it("404, menuName is not found", async () => {
    const res = await request(app).get("/227018/full-menu/abc");
    expect(res.status).toBe(404);
  });

  it("200, restaurantsId and menuName are found", async () => {
    const res = await request(app).get("/227018/full-menu/Egg");
    expect(res.body).toEqual(
      expect.objectContaining({
        discountedPercent: expect.any(Number),
        discountedTimePeriod: expect.any(Object),
        fullPrice: expect.any(Number),
        id: expect.any(String),
        name: expect.any(String),
        options: expect.any(Array),
        popular: expect.anything(),
        sold: expect.any(Number),
        totalInStock: expect.any(Number),
      })
    )
  }); 
});

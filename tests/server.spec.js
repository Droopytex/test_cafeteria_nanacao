const request = require("supertest");
const server = require("../index");
const app = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Devuelve estado 200", async () => {
    const { statusCode } = await request(app).get("/cafes").send();
    expect(statusCode).toBe(200);
  });

  it("Devuelve un array", async () => {
    const response = await request(app).get("/cafes");
    expect(response.body).toBeInstanceOf(Array);
  });

  it("Devuelve un array con al menos un objeto", async () => {
    const response = await request(app).get("/cafes");
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Devuelve 404 si no encuentra ID al intentar eliminar", async () => {
    const response = await request(app)
      .delete(`/cafes/60`)
      .set("Authorization", `Bearer`);
    expect(response.status).toBe(404);
  });

  it("POST/cafes agrega un nuevo café y devuelve un código 201", async () => {
    const nuevoCafe = {
      nombre: "Café Negro",
    };
    const response = await request(app).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  describe("PUT /cafes/:id", () => {
    it("Devolver un code 400 si los ids no coinciden", async () => {
      const cafeActualizado = {
        id: 1,
        nombre: "Café Latte",
        descripcion: "Café con leche",
      };
      const response = await request(app).put("/cafes/2").send(cafeActualizado);
      expect(response.status).toBe(400);
    });
  });
});

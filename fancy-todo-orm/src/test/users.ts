export class UsersTest {
  static async get() {
    console.warn("[TEST] GET /users");
    const response = await fetch("localhost:8080/users");
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async post() {
    console.warn("[TEST] POST /users");
    const response = await fetch("localhost:8080/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Fulan",
        phone: "0895",
        email: "siFooLan@FuBar.dev"
      })
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async delete(id: string) {
    console.warn("[TEST] DELETE /users:id");
    const response = await fetch(`localhost:8080/users/${id}`, {
      method: "DELETE"
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async put(id: string) {
    console.warn("[TEST] PUT /users:id");
    const response = await fetch(`localhost:8080/users/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "FemFulan",
        phone: "0895",
        email: "siFooLan@FuBar.dev"
      })
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }
}

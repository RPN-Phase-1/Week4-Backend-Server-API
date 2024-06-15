export class TodosTest {
  static async get() {
    console.warn("[TEST] GET /todos");
    const response = await fetch("localhost:8080/todos");
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async post(userId: string) {
    console.warn("[TEST] POST /todos");
    const response = await fetch("localhost:8080/todos", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Buy Eggs",
        description: "need to do this asap! coz i havent get breakfast",
        status: "ongoing",
        userId
      })
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async delete(id: string) {
    console.warn("[TEST] DELETE /todos:id");
    const response = await fetch(`localhost:8080/todos/${id}`, {
      method: "DELETE"
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }

  static async put(id: string, userId: string) {
    console.warn("[TEST] PUT /todos:id");
    const response = await fetch(`localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Buy Eggs",
        description: "hey i think this isnt not really that bad, i can handle it",
        status: "cancelled",
        userId
      })
    });
    console.warn("Response:", response.status);
    console.warn("Body:")
    console.log(await response.text());
  }
}

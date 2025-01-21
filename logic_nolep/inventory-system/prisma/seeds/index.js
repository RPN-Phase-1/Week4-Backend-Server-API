const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
    },
  });

  const books = await prisma.category.create({
    data: {
      name: "Books",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: "Fitra",
      email: "fitra@gmail.com",
      password: "password",
      role: "customer",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Ilyasa",
      email: "ilyasa@gmail.com",
      password: "password",
      role: "admin",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "Smartphone",
      description: "A high-quality smartphone",
      price: 699.99,
      quantityInStock: 100,
      categoryId: electronics.id,
      userId: user2.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Fiction Book",
      description: "A popular fiction book",
      price: 19.99,
      quantityInStock: 50,
      categoryId: books.id,
      userId: user2.id,
    },
  });

  const order1 = await prisma.order.create({
    data: {
      totalPrice: 739.97,
      customerName: "Fitra",
      customerEmail: "fitra@gmail.com",
      userId: user1.id,
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            unitPrice: 699.99,
          },
          {
            productId: product2.id,
            quantity: 2,
            unitPrice: 19.99,
          },
        ],
      },
    },
  });

  await prisma.token.create({
    data: {
      token: "sample-token-123",
      type: "auth",
      userId: user1.id,
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      blacklisted: false,
    },
  });

  console.log("Seed data created!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

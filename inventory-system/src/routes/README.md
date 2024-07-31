# inventory-system

mungkin diantara kalian ada yg melihat kalo struktural bikin route di repository ini agak beda
alasan gw bikin begini karena:

```md
- Agar lebih customize tiap route GET sama POST bisa beda middleware
- Langsung membuat route tanpa harus di deklarasiin dulu di App.ts
- Jujur iseng aja sih mau nerapin penggunaan rekursif
```

dan ya untuk contoh membuat route kita hanya perlu masuk ke `/routes` trus buat folder dan file,
misal jika ingin membuat route `/v1/halo` dengan metode `GET` maka kita hanya perlu membuatnya seperti ini

```
./src/routes/v1/halo/get.ts
```

lalu isi filenya dengan kode berikut

```ts
// tipe deklarasi
import type { Request, Response, NextFunction } from "express";

// import base router dari sini
import RouterBuilder from "../../../lib/models/RouterBuilder";

// Kita membuat kelas sekaligus menerapkan inheritanc dri RouterBuilder
export default class extends RouterBuilder {

  // Lalu kita override fungsi controller
  public static override async controller(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("halo!")
  }
}
```

maka file ini akan terbaca oleh library util `WalkRouter` dan akan otomatis meregisternya kedalam router.

Untuk menambahkan middleware kita hanya perlu menambahkan dekorator `@AddMidleware`
Contoh jika ingin route `v1/halo` hanya diizinkan bagi orang yang login


```ts
import type { Request, Response, NextFunction } from "express";
import RouterBuilder from "../../../lib/models/RouterBuilder";

// Kita import dekoratornya dri sini
import { AddMidleware } from "../../../lib/utils/RouterDecorator";

// Kita import middlewar untuk autentikasi
import AuntheticationMiddleware from "../../../lib/middlewares/AuthenticationMiddleware";

// lalu gunakan disini
@AddMidleware(AuthenticationMiddleware.auth())
export default class extends RouterBuilder {
  public static override async controller(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("halo!")
  }
}
```

Untuk error handling sendiri sudah ditangani oleh util `WalkRouter`
karena saat meregistrasi dia otomatis memanggil util `CatchAsync` dan menggunakannya pda controller

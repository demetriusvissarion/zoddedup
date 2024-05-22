import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { z } from "zod";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

enum Hobbies {
  Fishing = "Fishing",
  Dancing = "Dancing",
}

const hobbies = ["Running", "Hunting"] as const;

const UserSchema = z.object({
  username: z.string().min(2).max(12), // no. of chars
  age: z.number().gt(0).optional(), // > 0
  birthdate: z.date().optional(),
  isProgrammer: z.boolean().optional(),
  score: z.bigint().optional(),
  test1: z.any().optional(),
  test2: z.null().optional(),
  test3: z.undefined().optional(),
  test6: z.unknown().optional(),
  test4: z.never().optional(), // it can never have this key
  test5: z.void().optional(),
  hobby: z.enum(["Programming", "Weight Lifting", "Reading"]),
  hobby2: z.nativeEnum(Hobbies),
  hobby3: z.enum(hobbies),
  friends: z.array(z.string()).nonempty(),
  coords: z.tuple([z.number(), z.string(), z.number().gt(2).int()]),
  meterReading: z.tuple([z.string(), z.date()]).rest(z.number()),
  id: z.union([z.string(), z.number()]), // also works with z.string().or(z.number()) or use discriminatedUnion for performance
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "DDV",
  hobby: "Programming",
  hobby2: Hobbies.Fishing,
  hobby3: "Running",
  friends: ["Kyle", "Julie"],
  coords: [1, "two", 3],
  meterReading: ["test", new Date(), 3, 4, 5, 6, 7, 8],
  id: "sdgsdg",
};

console.log(UserSchema.safeParse(user));

// console.log(UserSchema.partial().parse(user)); // partial makes all fields optional

const PromiseSchema = z.promise(z.string());

const p = Promise.resolve("sfsd");

console.log(PromiseSchema.parse(p));

const brandEmail = z
  .string()
  .email()
  .refine((val) => val.endsWith("@h3h3.com"), {
    message: "Email must end with @h3h3.com",
  });

const email1 = "test@test.com";
// const email2 = "test@h3h3.com";

console.log(brandEmail.parse(email1));
// console.log(brandEmail.parse(email2));

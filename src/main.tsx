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
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  username: "DDV",
  hobby: "Programming",
  hobby2: Hobbies.Fishing,
  hobby3: "Running",
  friends: ["Kyle", "Julie"],
};

console.log(UserSchema.safeParse(user));

// console.log(UserSchema.partial().parse(user)); // partial makes all fields optional

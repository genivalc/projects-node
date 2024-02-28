import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import crypo from "crypto";

//query: buscar dados
// mutation: modificar dados, criar, deletar ...

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users() {
    return this.data;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string) {
    const user = { id: crypo.randomUUID(), name };

    this.data.push(user);

    return user;
  }
}

// query {
//   users {
//     id,
//     name
//   }
// }

// mutation {
//   createUser(name: "Genival 2") {
//     id
//     name
//   }
// }

//https://github.com/eldoncosta1/introduction-graphql/blob/master/backend/src/models/User.ts
// https://www.youtube.com/watch?v=6SZOPKs9SUg

import { Resolver, Query } from "type-graphql";

@Resolver()
export class HelloReolver {
  @Query(() => String)
  hello() {
    return "hello world";
  }
}

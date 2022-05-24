import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

//  m to n
// many to many
// user <-> posts
// user -> join table <- posts
// user -> like <- posts

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @ManyToOne(() => Post)
  post: Post;
}
